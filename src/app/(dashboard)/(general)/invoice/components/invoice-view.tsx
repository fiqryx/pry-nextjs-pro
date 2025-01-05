'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useFilter } from "../use-filter"
import { useInvoices } from "../use-invoices"

import {
    LayoutList,
    ListIcon
} from "lucide-react"
import {
    ToggleGroup,
    ToggleGroupItem
} from "@/components/ui/toggle-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function InvoiceView({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [filter, setFilter] = useFilter()
    const [invoices, setInvoices] = useInvoices()

    const sortByIssueDate = React.useCallback(
        (order: 'asc' | 'desc') => {
            const sorted = [...invoices].sort((a, b) => {
                const dateA = a.issueDate.getTime();
                const dateB = b.issueDate.getTime();

                return order === 'asc' ? dateA - dateB : dateB - dateA;
            })

            setInvoices(sorted)
            setFilter({ ...filter, order })
        },
        [invoices, filter]
    )

    return (
        <div {...props} className={cn('flex justify-end gap-2', className)}>
            <Select
                value={filter.order}
                onValueChange={sortByIssueDate}
            >
                <SelectTrigger className="w-32 h-10">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="desc">
                            Newest
                        </SelectItem>
                        <SelectItem value="asc">
                            Oldest
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <ToggleGroup
                size="sm"
                type="single"
                value={filter.type}
                className="border rounded-md h-10 p-1"
                onValueChange={(type) => setFilter({ ...filter, type })}
            >
                <ToggleGroupItem value="group">
                    <LayoutList className="size-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list">
                    <ListIcon className="size-4" />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
}