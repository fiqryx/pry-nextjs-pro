"use client"

import React from "react"
import { useRooms } from "../use-rooms"
import { cn, toDecimal } from "@/lib/utils"
import { useWidgets } from "../use-widgets"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ReactSortable } from "react-sortablejs"

import {
    Label,
    LabelProps,
    Pie,
    PieChart,
} from "recharts"
import {
    PlusIcon,
    MinusIcon,
    GripVertical,
    EllipsisVertical,
} from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


type SmartHomeTemperatureProps = Pick<
    React.ComponentProps<typeof ReactSortable>,
    'className'
>

export function SmartHomeWidgetDetails({
    className,
    ...props
}: SmartHomeTemperatureProps) {
    const [room] = useRooms()
    const [widgets] = useWidgets()
    const [widgetDetails, setWidgetDetails] = React.useState(
        widgets
    )

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setWidgetDetails((prevWidgets) =>
                prevWidgets.map((widget) => {
                    const range = (widget.max * 1) / 100;
                    const delta = Math.floor(Math.random() * (range * 2 + 1)) - range;
                    const value = Math.max(1, Math.min(
                        widget.max, widget.value + delta
                    ));

                    return {
                        ...widget,
                        value: toDecimal(value, 1)
                    };
                })
            );
        }, 5000);

        return () => clearInterval(intervalId);
    }, [])

    React.useEffect(() => {
        setWidgetDetails((prev) => {
            const updated = prev.map((v) => {
                const widget = widgets.find((w) => w.id === v.id);

                return {
                    ...v,
                    active: widget?.active ?? v.active,
                }
            });

            const newest = widgets.filter(
                (w) => !prev.some((v) => v.id === w.id)
            );

            return [...updated, ...newest];
        });
    }, [widgets]);

    return (
        <ReactSortable
            {...props}
            delay={2}
            animation={200}
            delayOnTouchOnly
            handle=".drag-handle"
            list={widgetDetails}
            setList={setWidgetDetails}
            className={cn('grid gap-5', className)}
        >
            {widgetDetails.map((item) => (
                <Card key={item.id}>
                    <CardHeader className="flex flex-row flex-wrap justify-between items-center p-4 gap-4">
                        <div className="inline-flex justify-center items-center gap-2">
                            <GripVertical className="size-4 hover:cursor-grab drag-handle" />
                            <Badge variant="primary" className="rounded-full p-2">
                                <item.icon className="size-5" />
                            </Badge>
                            <CardTitle className="text-sm capitalize sm:w-36 lg:w-auto">
                                {room.selected} {item.label}&nbsp;
                            </CardTitle>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button size="icon" variant="ghost" className="rounded-full">
                                <EllipsisVertical />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center gap-5">
                        <Button size="icon" variant="ghost">
                            <MinusIcon />
                        </Button>

                        <ChartMeasure
                            {...item}
                            label={`Power ${item.active ? 'On' : 'Off'}`}
                            className="border rounded-full shadow-sm"
                        />

                        <Button size="icon" variant="ghost">
                            <PlusIcon />
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </ReactSortable>
    )
}

interface ChartMeasureProps extends
    Omit<React.ComponentProps<'div'>, 'id'> {
    size?: number
    label?: string
    value: number
    min?: number
    max?: number
    unit?: string
    active?: boolean
}

function ChartMeasure({
    size = 200,
    label,
    value,
    unit,
    min = 0,
    max = 100,
    active,
    className,
    children,
}: ChartMeasureProps) {
    const range = max - min;
    const normalized = active ? Math.min(Math.max(value, min), max) : min;
    const filled = active ? normalized - min : 0;

    const data = [
        { value: filled, fill: "hsl(var(--chart-1))" },
        { value: range - (normalized - min), fill: "hsl(var(--muted))" },
    ];

    return (
        <div
            className={cn(
                'flex flex-col justify-center items-center gap-2',
                className
            )}
        >
            <PieChart width={size} height={size}>
                <Pie
                    data={data}
                    startAngle={220}
                    endAngle={-40}
                    innerRadius={75}
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                >
                    <Label content={(props) => (
                        <ChartLabel {...props} label={label}>
                            {active ? `${normalized}${unit}` : 'N/A'}
                        </ChartLabel>
                    )} />
                </Pie>
            </PieChart>
            {children}
        </div>
    );
}

type ChartLabelProps = LabelProps & {
    label?: string
}

function ChartLabel({
    label,
    viewBox,
    children,
}: ChartLabelProps) {
    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
        return (
            <g
                x={viewBox.cx}
                y={viewBox.cy}
                textAnchor="middle"
                dominantBaseline="middle"
            >
                <text>
                    <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                    >
                        {children}
                    </tspan>
                    <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="text-sm fill-muted-foreground"
                    >
                        {label}
                    </tspan>
                </text>
            </g>
        )
    }
}

