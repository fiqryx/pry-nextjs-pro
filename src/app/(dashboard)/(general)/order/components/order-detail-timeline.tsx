'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useOrder } from "../use-order"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {
    MailIcon,
    TimerIcon,
    TruckIcon,
    UserIcon
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineDot,
    TimelineContent,
    TimelineContentLabel,
    TimelineContentDescription
} from "@/components/ui/timeline"


export function OrderDetailTimeline({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [order] = useOrder()

    if (!order) {
        return null
    }

    return (
        <div {...props} className={cn('w-full', className)}>
            <Card>
                <CardHeader className="sm:flex-row justify-between sm:items-center gap-2">
                    <div className="flex items-center gap-4">
                        <Badge variant="primary" className="rounded-full p-2">
                            <TimerIcon />
                        </Badge>
                        <CardTitle>
                            Timeline
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-8">
                    <div className="flex flex-col gap-4">
                        <Textarea placeholder="Add a note" className="h-24" />
                        <div className="flex justify-end">
                            <Button type="button" className="w-fit">
                                Add note
                            </Button>
                        </div>
                    </div>

                    <Timeline size="lg" variant="outline">
                        <TimelineItem>
                            <TimelineConnector>
                                <TimelineDot>
                                    <Avatar className="text-sm rounded-full">
                                        <AvatarImage src={order.customer.image} alt={order.customer.name} />
                                        <AvatarFallback className="rounded-full">
                                            <UserIcon className="text-muted-foreground" />
                                        </AvatarFallback>
                                    </Avatar>
                                </TimelineDot>
                            </TimelineConnector>
                            <TimelineContent>
                                <TimelineContentLabel className="text-sm">
                                    {order.customer.name} added a note
                                </TimelineContentLabel>
                                <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all">
                                    <p className="text-sm font-medium">
                                        Customer states that the products have been damaged by the courier.
                                    </p>
                                </div>
                                <TimelineContentDescription className="text-xs">
                                    Nov 26, 01:38 PM
                                </TimelineContentDescription>
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineConnector>
                                <TimelineDot>
                                    <MailIcon className="size-4" />
                                </TimelineDot>
                            </TimelineConnector>
                            <TimelineContent>
                                <TimelineContentLabel className="text-sm">
                                    Shipment notice sent
                                </TimelineContentLabel>
                                <TimelineContentDescription className="text-xs">
                                    Nov 26, 04:38 AM
                                </TimelineContentDescription>
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineConnector>
                                <TimelineDot>
                                    <TruckIcon className="size-4" />
                                </TimelineDot>
                            </TimelineConnector>
                            <TimelineContent>
                                <TimelineContentLabel className="text-sm">
                                    Items shipped
                                </TimelineContentLabel>
                                <p className="text-sm">
                                    Shipped via USPS with tracking number 940011189.
                                </p>
                                <TimelineContentDescription className="text-xs">
                                    Nov 25, 10:38 PM
                                </TimelineContentDescription>
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineConnector hideLine>
                                <TimelineDot>
                                    <TruckIcon className="size-4" />
                                </TimelineDot>
                            </TimelineConnector>
                            <TimelineContent>
                                <TimelineContentLabel className="text-sm">
                                    Order created
                                </TimelineContentLabel>
                                <TimelineContentDescription className="text-xs">
                                    Nov 25, 07:38 PM
                                </TimelineContentDescription>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </CardContent>
            </Card>
        </div>
    )
}