'use client'
import { toast } from 'sonner'
import { useState } from 'react'
import { Task } from '@/types/task'
import { cn, sortByDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { TimeUnit } from '@/components/ui/calendar-timeline'

import { addDays, addMonths, format, isAfter, isBefore } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import {
    CheckIcon,
    ChevronLeft,
    ChevronRight,
    ListFilterPlus,
    ArrowDownNarrowWide,
    CalendarIcon,
    FocusIcon,
    CheckSquare2,
    Copy,
    BugIcon,
    CircleMinus,
    Clock3,
    CircleCheck,
} from 'lucide-react';
import {
    useCalendarTimeline,
    CalendarTimelineContent,
    CalendarTimelineControl,
    CalendarTimelineHeader,
    CalendarTimelineProvider,
    CalendarTimelineRows
} from '@/components/ui/calendar-timeline';

const unitMap = {
    day: 'daily',
    week: 'weekly',
    month: 'monthly',
    quarter: 'quarterly'
} as const;

const typeMap = {
    task: CheckSquare2,
    subtask: Copy,
    bug: BugIcon
} as const

const statusMap = {
    todo: CircleMinus,
    "on-progress": Clock3,
    done: CircleCheck
} as const

export function TimelineCalendar({ tasks }: { tasks: Task[] }) {
    const [focus, setFocus] = useState(false);
    const [data, setData] = useState(tasks);
    const [hideRowHeader, setHideRowHeader] = useState(false);

    const [unit, setUnit] = useState<TimeUnit>('week');
    const [sort, setSort] = useState<'asc' | 'desc'>('asc');
    const [date, setDate] = useState({
        from: addMonths(new Date(), -3),
        to: addMonths(new Date(), 3),
    });

    const timeline = useCalendarTimeline({
        unit,
        dateRange: date,
        data: sortByDate(data, 'createdAt', sort),
        field: {
            state: {
                header: 'name',
                startDate: 'startDate',
                endDate: 'endDate'
            },
            header: (item) => {
                const Comp = typeMap[item.type];
                return (
                    <div className="flex flex-shrink-0 w-full items-center gap-1">
                        <div className="icon">
                            <Comp className={cn('size-4', item.type === 'bug' ? 'text-destructive' : 'text-blue-500')} />
                        </div>
                        <a href="#" className='text-xs font-semibold truncate hover:underline'>
                            {item.name}
                        </a>
                    </div>
                )
            },
            cell: (item) => {
                const Comp = statusMap[item.status];
                const startDate = item.startDate ? format(item.startDate, "EEE, MMM d ") : '';
                const endDate = item.endDate ? format(item.endDate, "EEE, MMM d") : '';

                return (
                    <div className='flex flex-shrink-0 items-center gap-1 max-w-full'>
                        <Avatar className='size-7 mr-1' title={item.assignee.name}>
                            <AvatarImage src={item.assignee.image} alt={item.assignee.name} />
                            <AvatarFallback className='text-muted-foreground'>
                                {item.assignee.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="icon">
                            <Comp
                                className={cn(
                                    'size-4',
                                    item.status === 'todo' && 'text-muted-foreground',
                                    item.status === 'on-progress' && 'text-blue-500',
                                    item.status === 'done' && 'text-success',
                                )}
                            />
                        </div>
                        <span title={`${startDate} - ${endDate}`} className="text-xs truncate font-normal">
                            {`${startDate} - ${endDate}`}
                        </span>
                    </div>
                )
            },
            onClick: ({ item, startDate, endDate }) => {
                toast.info(`Clicked ${item ? 'timeline' : 'calendar'}, see log for detail.`);
                console.log({ item, startDate, endDate });
            },
            onDrop: ({ item, startDate, endDate }) => {
                setData((prev) => prev.map((value) =>
                    value.id === item.id ? { ...item, startDate, endDate } : value
                ))
            }
        },
    });

    return (
        <CalendarTimelineProvider
            force={!focus}
            context={timeline}
            hideRowHeader={hideRowHeader}
        >
            <CalendarTimelineControl className='justify-between'>
                <div className="flex items-center gap-1">
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => timeline.navigate('prev')}
                        className='rounded-sm size-8'
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => timeline.navigate('next')}
                        className='rounded-sm size-8'
                    >
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={timeline.scrollToday}
                        className='text-xs rounded-sm h-8'
                    >
                        Today
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost-primary"
                        onClick={() => setHideRowHeader(!hideRowHeader)}
                        className="text-xs rounded-sm h-8 bg-primary/10 hover:bg-primary/30"
                    >
                        {hideRowHeader ? 'Show' : 'Hide'} panel
                    </Button>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost-primary"
                                className="text-xs rounded-sm h-8 bg-primary/10 hover:bg-primary/30"
                            >
                                <ListFilterPlus className="size-4" />
                                Show in {unitMap[timeline.unit]}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {Object.keys(unitMap).map((key, idx) => (
                                <DropdownMenuItem
                                    key={idx}
                                    onClick={() => setUnit(key as TimeUnit)}
                                    className="capitalize text-xs focus:text-primary focus:bg-primary/40"
                                >
                                    {key}
                                    {key === unit && <CheckIcon className='ml-auto' />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost-primary"
                                className="text-xs rounded-sm h-8 bg-primary/10 hover:bg-primary/30"
                            >
                                <ArrowDownNarrowWide className="size-5" />
                                Sort {sort}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {['asc', 'desc'].map((key, idx) => (
                                <DropdownMenuItem
                                    key={idx}
                                    onClick={() => setSort(key as 'asc')}
                                    className="capitalize text-xs focus:text-primary focus:bg-primary/40"
                                >
                                    {key}
                                    {key === sort && <CheckIcon className='ml-auto' />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost-primary"
                                className="text-xs rounded-sm h-8 bg-primary/10 hover:bg-primary/30"
                            >
                                <CalendarIcon className='size-5' />
                                Date fields
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <div className="flex gap-4">
                                <Calendar
                                    initialFocus
                                    mode="single"
                                    selected={date.from}
                                    defaultMonth={date.from}
                                    className="border-r pr-4"
                                    onSelect={(from) => {
                                        if (!from) return
                                        setDate((prev) => ({
                                            from,
                                            to: prev.to && isAfter(from, prev.to) ? addDays(from, 1) : prev.to
                                        }))
                                    }}
                                />
                                <Calendar
                                    initialFocus
                                    mode="single"
                                    selected={date.to}
                                    defaultMonth={date.to}
                                    disabled={(value) => isBefore(value, date.from || new Date())}
                                    onSelect={(to) => {
                                        if (!to) return
                                        setDate((prev) => ({ to, from: prev.from || addDays(to, -1) }))
                                    }}
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Button
                        size="icon"
                        variant={focus ? "secondary" : "outline"}
                        className="text-xs rounded-sm size-8"
                        onClick={() => setFocus(!focus)}
                    >
                        <FocusIcon className='size-5' />
                    </Button>
                </div>
            </CalendarTimelineControl>

            <CalendarTimelineContent className='max-h-[42rem]'>
                <CalendarTimelineHeader />
                <CalendarTimelineRows />
            </CalendarTimelineContent>
        </CalendarTimelineProvider>
    )
}
