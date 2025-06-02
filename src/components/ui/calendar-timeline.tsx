'use client'
import { cn } from '@/lib/utils';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
    memo,
    useRef,
    useMemo,
    useCallback,
    useContext,
    createContext,
    useEffect,
    useState
} from "react"
import {
    addDays,
    differenceInDays,
    endOfMonth,
    endOfQuarter,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isSameQuarter,
    isSameWeek,
    isSameYear,
    parseISO,
    eachDayOfInterval,
    eachWeekOfInterval,
    eachMonthOfInterval,
    eachQuarterOfInterval,
    addWeeks,
    addMonths,
    addQuarters,
    subMonths,
} from 'date-fns';

export type KValue<T, V> = keyof { [K in keyof T as T[K] extends V ? K : never]: T[K] }
export type TRange<T> = { from: T, to: T }
export type TCallback<T, K> = (item: T) => K;
export type TParams<T> = { item: T, startDate: Date, endDate: Date }
export type TDrop<T> = (params: TParams<T>) => void;
export type TClick<T> = (params: TParams<T | null>) => void;
export type TRender<T> = (value: T) => React.ReactNode

export type TimeUnit = 'day' | 'week' | 'month' | 'quarter'
export type Position = { left: string; width: string }
export type TData = { id: string | number, position?: Position, [key: string]: any }

export interface TField<T extends TData> {
    state: {
        header: KValue<T, string> | TCallback<T, string>
        startDate: KValue<T, Date | undefined> | TCallback<T, Date | undefined>
        endDate: KValue<T, Date | undefined> | TCallback<T, Date | undefined>
    }
    header?: TRender<T>
    cell?: TRender<T>
    onDrop?: TDrop<T>
    onClick?: TClick<T>
}

const TIMELINE_CELL = 'w-52';
const TIMELINE_TYPE = 'calendar-timeline';

function getValue(item: TData, dateField: string | TCallback<TData, string>) {
    return typeof dateField === 'function'
        ? dateField(item)
        : item[dateField];
}

function getDateValue(item: TData, dateField: string | TCallback<TData, string>) {
    const value = typeof dateField === 'function'
        ? dateField(item)
        : item[dateField];
    return value instanceof Date ? format(value, 'yyyy-MM-dd') : value;
}

function getEndDate(date: Date, unit: TimeUnit) {
    switch (unit) {
        case 'week': return endOfWeek(date, { weekStartsOn: 1 });
        case 'month': return endOfMonth(date);
        case 'quarter': return endOfQuarter(date);
        default: return addDays(date, 1);
    }
}

function getWidth(unit: TimeUnit) {
    switch (unit) {
        case 'week': return 'min-w-32';
        case 'month': return 'min-w-40';
        case 'quarter': return 'min-w-48';
        default: return 'min-w-24';
    }
}

function inRange(unit: TimeUnit, itemDate: Date, timeUnitDate: Date) {
    switch (unit) {
        case 'day':
            return isSameDay(itemDate, timeUnitDate);
        case 'week':
            return isSameWeek(itemDate, timeUnitDate, { weekStartsOn: 1 });
        case 'month':
            return isSameMonth(itemDate, timeUnitDate);
        case 'quarter':
            return isSameQuarter(itemDate, timeUnitDate);
    }
}

type CalendarTimelineContext = {
    ref: React.RefObject<HTMLDivElement | null>
    data: TData[]
    field: TField<any>
    unit: TimeUnit
    units: Date[]
    isNotEmpty?: boolean
    hideRowHeader?: boolean
}

const CalendarTimelineContext = createContext<CalendarTimelineContext | null>(null);

function useCalendarTimelineContext() {
    const context = useContext(CalendarTimelineContext)
    if (!context) {
        throw new Error("The component must be used within a timeline provider")
    }
    return context
}

type CalendarTimelineProps = React.ComponentProps<'div'> & {
    context: CalendarTimelineContext
    force?: boolean
    hideRowHeader?: boolean
}

function CalendarTimelineProvider({ context, force, className, hideRowHeader, children, ...props }: CalendarTimelineProps) {
    const getPosition = useCallback((item: TData) => {
        const { startDate, endDate } = context.field.state;
        const start = getDateValue(item, startDate as string);
        const end = getDateValue(item, endDate as string);

        if (!start || !end) return;

        const itemStart = parseISO(start);
        const itemEnd = parseISO(end);

        let startIndex = -1;
        let endIndex = -1;

        context.units.forEach((unitDate, index) => {
            if (inRange(context.unit, itemStart, unitDate) && startIndex === -1) {
                startIndex = index;
            }
            if (inRange(context.unit, itemEnd, unitDate)) {
                endIndex = index;
            }
        });

        if (startIndex === -1 || endIndex === -1) return;

        const span = endIndex - startIndex + 1;
        return {
            left: `${(startIndex / context.units.length) * 100}%`,
            width: `${(span / context.units.length) * 100}%`
        };
    }, [context.data, context.unit, context.units]);

    const data = useMemo(() => {
        return context.data.map((item) => {
            const position = getPosition(item);
            return position || force ? { ...item, position } : null;
        }).filter(Boolean) as TData[];
    }, [force, getPosition, context.data.length]);

    const isNotEmpty = useMemo(() => {
        return data.find(v => !!v.position) && data.length > 0
    }, [data])

    return (
        <DndProvider backend={HTML5Backend}>
            <CalendarTimelineContext.Provider value={{ ...context, data, isNotEmpty, hideRowHeader }}>
                <div
                    {...props}
                    className={cn('grid rounded-sm border', className)}
                >
                    {children}
                </div>
            </CalendarTimelineContext.Provider>
        </DndProvider>
    );
}
CalendarTimelineProvider.displayName = "CalendarTimelineProvider";

function CalendarTimelineControl({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            {...props}
            className={cn('flex flex-wrap items-center bg-sidebar p-2 gap-1', className)}
        />
    )
}
CalendarTimelineControl.displayName = "CalendarTimelineControl"

// (optional) you can remove scroll-area and add class `overflow-x-auto` then add `ref` on `div` element
function CalendarTimelineContent({ className, style, children, ...props }: React.ComponentProps<'div'>) {
    const { ref } = useCalendarTimelineContext();
    return (
        <ScrollArea viewportRef={ref}>
            <div
                {...props}
                style={{ scrollbarWidth: 'thin', ...style }}
                className={cn('scroll-smooth flex-grow border-t', className)}
            >
                <div className="relative xmin-w-max">
                    {children}
                </div>
            </div>
            <ScrollBar orientation='horizontal' />
        </ScrollArea>
    )
}
CalendarTimelineContent.displayName = "CalendarTimelineContent"

interface CalendarTimelineHeaderProps extends
    React.ComponentProps<'div'> {
    render?: (date: Date) => React.ReactNode
}

const CalendarTimelineHeader = memo(({ render, className, ...props }: CalendarTimelineHeaderProps) => {
    const { unit, units, isNotEmpty, hideRowHeader } = useCalendarTimelineContext();

    const getText = useCallback((date: Date) => {
        if (render) return
        switch (unit) {
            case 'day':
                return format(date, `EEE, ${isSameYear(date, new Date()) ? "MMM d" : "MMM d ''yy"}`)
            case 'week':
                return `${format(date, "MMM d")} - ${format(getEndDate(date, 'week'), isSameYear(date, new Date()) ? "MMM d" : "MMM d ''yy")}`
            case 'month':
                return format(date, "MMMM yyyy")
            case 'quarter':
                return `Q${format(date, "q yyyy")}`
        }
    }, [unit, render]);

    return (
        <div
            {...props}
            className={cn('sticky top-0 flex border-b border-input bg-sidebar z-2', className)}
        >
            {isNotEmpty && !hideRowHeader && <div className={cn('flex-shrink-0', TIMELINE_CELL)} />}
            {units.map((date) => (
                <div
                    key={date.toString()}
                    className={cn(
                        'flex-1 text-center py-2 border-x border-input',
                        getWidth(unit),
                        inRange(unit, new Date(), date) && 'bg-primary/10 text-primary',
                    )}
                >
                    {render ? render(date) : (
                        <div className="text-xs font-semibold">
                            {getText(date)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
});
CalendarTimelineHeader.displayName = "CalendarTimelineHeader";

const CalendarTimelineRows = memo(({ className, children, ...props }: React.ComponentProps<'div'>) => {
    const { data, unit, units, field, isNotEmpty, hideRowHeader } = useCalendarTimelineContext();

    const getText = useCallback((item: TData) => {
        const { header } = field.state;
        return typeof header === 'function' ? header(item) : item[header as string]
    }, [field.state]);

    const getDates = useCallback((item: TData, unitIndex: number, skipCalculate?: boolean) => {
        const startValue = getDateValue(item, field.state.startDate as string);
        const endValue = getDateValue(item, field.state.endDate as string);

        const newStartDate = units[unitIndex];

        if (!startValue || !endValue || skipCalculate) {
            return {
                start: newStartDate,
                end: getEndDate(newStartDate, unit)
            };
        }

        const duration = differenceInDays(parseISO(endValue), parseISO(startValue));
        return {
            start: newStartDate,
            end: addDays(newStartDate, duration)
        };
    }, [unit, units, field.state]);

    const onClickOrDrop = useCallback(
        (item: TData, idx: number, method: 'onClick' | 'onDrop') => {
            if (field[method]) {
                const { start, end } = getDates(item, idx, method === 'onClick');
                field[method]({
                    item: method === 'onDrop' ? item : undefined,
                    startDate: start,
                    endDate: end
                });
            }
        },
        [field.onDrop, field.onClick]
    );

    if (!isNotEmpty) {
        return (
            <div
                {...props}
                className={cn('flex-1 border-b', className)}
            >
                <div className="flex flex-col w-full text-sm text-center text-muted-foreground border-x p-2">
                    {children || 'No result'}
                </div>
            </div>
        );
    }

    return (
        <div
            {...props}
            className={cn('flex-1 border-b', className)}
        >
            {data.map((item) => (
                <div key={item.id} className="flex relative">
                    <div
                        title={getText(item)}
                        className={cn(
                            'h-fit min-h-11 flex items-center flex-shrink-0 p-2 overflow-hidden bg-sidebar truncate z-1 sticky left-0 border-r',
                            'transition-transform duration-300 ease-out',
                            hideRowHeader ? 'translate-x-[-100%]' : 'translate-x-0',
                            TIMELINE_CELL
                        )}
                    >
                        {field.header ? field.header(item) : (
                            <span className="text-xs font-semibold">
                                {getText(item)}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-1 min-h-11 relative overflow-auto xborder-b border-input">
                        {units.map((date, idx) => (
                            <CalendarTimelineDropCell
                                key={date.toString()}
                                accept={item.id}
                                onClick={() => onClickOrDrop(item, idx, 'onClick')}
                                onDrop={() => onClickOrDrop(item, idx, 'onDrop')}
                            />
                        ))}

                        {item.position && (
                            <CalendarTimelineDragCell
                                item={item}
                                onClick={() => {
                                    if (field.onClick) {
                                        const startDate = getValue(item, field.state.startDate as string);
                                        const endDate = getValue(item, field.state.endDate as string);
                                        field.onClick({ item, startDate, endDate })
                                    }
                                }}
                            >
                                <div
                                    title={field.cell ? undefined : getText(item)}
                                    className="flex items-center h-full text-xs truncate p-1">
                                    {field.cell ? field.cell(item) : (
                                        <span className="text-xs font-semibold">
                                            {getText(item)}
                                        </span>
                                    )}
                                </div>
                            </CalendarTimelineDragCell>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
})
CalendarTimelineRows.displayName = "CalendarTimelineRows";

interface CalendarTimelineDropCellProps extends
    Omit<React.ComponentProps<'div'>, 'onDrop'> {
    accept: string | number
    onDrop?: () => void
}

const CalendarTimelineDropCell = memo(({ onDrop, accept, className, ...props }: CalendarTimelineDropCellProps) => {
    const { unit } = useCalendarTimelineContext();
    const [{ isOver }, drop] = useDrop(() => ({
        accept: `${TIMELINE_TYPE}_${accept}`,
        drop: () => {
            onDrop?.()
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            {...props}
            ref={drop as unknown as React.Ref<HTMLDivElement>}
            className={cn(
                'flex-1 border-r border-input',
                getWidth(unit),
                isOver ? 'bg-accent' : 'hover:bg-accent',
                className
            )}
        />
    )
});
CalendarTimelineDropCell.displayName = "CalendarTimelineDropCell";

interface CalendarTimelineDragCellProps extends
    React.ComponentProps<'div'> {
    item: TData
}

const CalendarTimelineDragCell = memo(({ item, className, ...props }: CalendarTimelineDragCellProps) => {
    const [{ isDragging }, drag] = useDrag({
        type: `${TIMELINE_TYPE}_${item.id}`,
        item: () => item,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            {...props}
            ref={drag as unknown as React.Ref<HTMLDivElement>}
            style={{
                left: item.position?.left,
                width: item.position?.width,
            }}
            className={cn(
                'absolute top-1 bottom-1 border bg-sidebar rounded-sm cursor-move transition-opacity duration-100',
                isDragging ? "opacity-50" : "opacity-100",
                className
            )}
        />
    )
});
CalendarTimelineDragCell.displayName = "CalendarTimelineDragCell";

export interface TimelineOptions<T extends TData> {
    data: T[]
    field: TField<T>
    unit: TimeUnit
    dateRange?: Partial<TRange<Date>>
}

export function useCalendarTimeline<T extends TData>({
    data,
    field,
    unit,
    dateRange
}: TimelineOptions<T>) {
    const ref = useRef<HTMLDivElement>(null);
    const [start, setStart] = useState(subMonths(new Date(), 3));
    const [end, setEnd] = useState(addMonths(new Date(), 3));

    const units = useMemo(() => {
        switch (unit) {
            case 'day':
                return eachDayOfInterval({ start, end });
            case 'week':
                return eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });
            case 'month':
                return eachMonthOfInterval({ start, end });
            case 'quarter':
                return eachQuarterOfInterval({ start, end });
            default:
                return eachDayOfInterval({ start, end });
        }
    }, [start, end, unit]);

    const navigate = useCallback((direction: 'prev' | 'next') => {
        const amount = direction === 'prev' ? -1 : 1;
        let newFromDate: Date;
        let newToDate: Date;

        switch (unit) {
            case 'day':
                newFromDate = addDays(start, amount * 7);
                newToDate = addDays(end, amount * 7);
                break;
            case 'week':
                newFromDate = addWeeks(start, amount * 4);
                newToDate = addWeeks(end, amount * 4);
                break;
            case 'month':
                newFromDate = addMonths(start, amount * 3);
                newToDate = addMonths(end, amount * 3);
                break;
            case 'quarter':
                newFromDate = addQuarters(start, amount * 2);
                newToDate = addQuarters(end, amount * 2);
                break;
            default:
                return;
        }

        setStart(newFromDate);
        setEnd(newToDate);
    }, [start, end, unit]);

    const scrollToday = useCallback(() => {
        if (!ref.current) return;

        const todayIndex = units.findIndex(unitDate => {
            const today = new Date();
            switch (unit) {
                case 'day': return isSameDay(today, unitDate);
                case 'week': return isSameWeek(today, unitDate);
                case 'month': return isSameMonth(today, unitDate);
                case 'quarter': return isSameQuarter(today, unitDate);
            }
        });

        if (todayIndex > -1) {
            const containerWidth = ref.current.clientWidth;
            const scrollWidth = ref.current.scrollWidth;
            const scrollPosition = (todayIndex / units.length) * scrollWidth - containerWidth / 3;
            ref.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
    }, [unit, units]);

    useEffect(() => {
        const id = requestIdleCallback(() => scrollToday());
        return () => cancelIdleCallback(id);
    }, [unit]);

    useEffect(() => {
        if (dateRange?.from) setStart(dateRange.from);
        if (dateRange?.to) setEnd(dateRange.to);
    }, [dateRange]);

    return {
        ref,
        unit,
        units,
        data,
        field,
        navigate,
        scrollToday
    }
}

export {
    CalendarTimelineProvider,
    CalendarTimelineControl,
    CalendarTimelineHeader,
    CalendarTimelineContent,
    CalendarTimelineRows
}