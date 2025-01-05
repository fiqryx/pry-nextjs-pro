'use client'
import React from "react"
import { cn, omit } from "@/lib/utils"
import { format } from "date-fns"
import { FilterAtom, useFilter } from "../use-filter"
import { useInvoices } from "../use-invoices"

import { CalendarIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export function InvoiceFilter({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [filter, setFilter] = useFilter()
    const [invoices, setInvoices] = useInvoices()
    const [originalInvoices] = React.useState(invoices)

    const onApplyFilter = React.useCallback(
        (prev: FilterAtom) => () => {
            const filtered = originalInvoices.filter(invoice => {
                if (prev.invoiceId && !invoice.invoiceId.includes(prev.invoiceId)) {
                    return false
                }

                if (prev.status && prev.status !== 'all' && invoice.status !== prev.status) {
                    return false
                }

                if (
                    prev.customer &&
                    !invoice.order.customer.name.
                        toLowerCase().
                        includes(prev.customer.toLowerCase())
                ) {
                    return false
                }

                if (prev.from && new Date(invoice.issueDate) <= prev.from) {
                    return false;
                }

                if (prev.to && new Date(invoice.issueDate) >= prev.to) {
                    return false;
                }

                return true;
            })

            setFilter({ ...prev, disabled: true })
            setInvoices(filtered)
        },
        [invoices, filter]
    )

    return (
        <div {...props} className={cn('', className)}>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="invoiceId">
                            Invoice ID
                        </Label>
                        <Input
                            id="invoiceId"
                            value={filter.invoiceId ?? ''}
                            onChange={(e) => setFilter({
                                ...filter, disabled: false, invoiceId: e.target.value
                            })}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="status" className="required">
                            Status
                        </Label>
                        <Select
                            value={filter.status ?? 'all'}
                            onValueChange={(status) => setFilter({
                                ...filter, disabled: false, status
                            })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="canceled">Canceled</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="customer">
                            Customer
                        </Label>
                        <Input
                            id="customer"
                            value={filter.customer ?? ''}
                            onChange={(e) => setFilter({
                                ...filter, disabled: false, customer: e.target.value
                            })}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="from">
                            From
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !filter.from && "text-muted-foreground"
                                    )}
                                >
                                    {filter.from ? format(filter.from, "LLL dd, y") : 'Pick a date'}
                                    <CalendarIcon className="ml-auto h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={filter.from}
                                    onSelect={(from) => setFilter({
                                        ...filter, disabled: false, from
                                    })}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="to">
                            To
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !filter.to && "text-muted-foreground"
                                    )}
                                >
                                    {filter.to ? format(filter.to, "LLL dd, y") : 'Pick a date'}
                                    <CalendarIcon className="ml-auto h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={filter.to}
                                    onSelect={(to) => setFilter({
                                        ...filter, disabled: false, to
                                    })}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid gap-2">
                        <Button
                            type="button"
                            onClick={onApplyFilter(filter)}
                            disabled={filter.disabled}
                            className="w-full disabled:bg-secondary disabled:text-muted-foreground"
                        >
                            Apply
                        </Button>
                        {(!filter.disabled || filter.from || filter.to) && (
                            <Button
                                type="button"
                                variant="link"
                                onClick={onApplyFilter(
                                    omit(filter, 'invoiceId', 'status', 'customer', 'from', 'to')
                                )}
                                className="w-full disabled:text-muted-foreground"
                            >
                                Clear filter
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}