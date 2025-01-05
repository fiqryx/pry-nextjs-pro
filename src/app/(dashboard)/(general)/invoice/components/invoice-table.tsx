'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useFilter } from "../use-filter"
import { useInvoices, useSummary } from "../use-invoices"

import { invoiceColumns } from "./invoice-columns"
import { Pagination } from "@/components/pagination"
import { DataTable } from "@/components/ui/data-table"
import { getInvoicesGroupByStatus } from "@/lib/fakers/invoice-faker"


export function InvoiceTable({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [summary] = useSummary()
    const [invoices] = useInvoices()
    const [filter, setFilter] = useFilter()

    const groupInvoices = React.useMemo(
        () => getInvoicesGroupByStatus({ ...filter, invoices }),
        [invoices, filter]
    )

    return (
        <div {...props} className={cn('grid gap-5 auto-rows-min', className)}>
            {filter.type === 'group' ? (
                <div className="grid gap-5">
                    {Object.keys(groupInvoices).map((item, idx) => {
                        const key = item as keyof typeof groupInvoices;

                        return (
                            <div key={idx} className="grid gap-2">
                                <h6 className="text-xl capitalize font-bold text-muted-foreground">
                                    {item} ({summary?.count[key]})
                                </h6>
                                <DataTable
                                    hideHeader
                                    hideColumns={['invoiceId']}
                                    columns={invoiceColumns}
                                    data={groupInvoices[key]}
                                />
                            </div>
                        )
                    })}
                </div>
            ) : (
                <DataTable
                    hideHeader
                    hideColumns={['invoiceId']}
                    data={invoices}
                    columns={invoiceColumns}
                    paginationOptions={filter}
                />
            )}

            <Pagination
                className="justify-end"
                pageIndex={filter.pageIndex}
                pageSize={filter.pageSize}
                totalRows={invoices.length}
                onPageIndexChange={(pageIndex) =>
                    setFilter({ ...filter, pageIndex })
                }
                onPageSizeChange={(pageSize) =>
                    setFilter({ ...filter, pageSize })
                }
            />
        </div>
    )
}