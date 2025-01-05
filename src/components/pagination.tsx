'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
    ChevronLeft,
    ChevronsLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export interface PaginationProps extends
    React.HTMLAttributes<HTMLDivElement> {
    totalSelected?: number
    totalRows?: number
    pageIndex?: number
    pageSize?: number
    pageSizeOptions?: number[]
    onPageIndexChange?: (n: number) => void
    onPageSizeChange?: (n: number) => void
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
    ({
        className,
        totalSelected,
        totalRows = 0,
        pageIndex = 0,
        pageSize = 5,
        pageSizeOptions = [5, 10, 25],
        onPageIndexChange,
        onPageSizeChange,
        ...props
    }, ref) => {
        const totalPages = Math.ceil(totalRows / pageSize)

        return (
            <div
                ref={ref}
                {...props}
                className={cn(
                    'flex items-center justify-between p-2',
                    className
                )}
            >
                {totalSelected !== undefined && totalRows !== undefined && (
                    <span className="text-sm text-muted-foreground">
                        {totalSelected} of {totalRows} Row selected
                    </span>
                )}
                <div className="flex flex-wrap items-center gap-6 lg:gap-8">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                            Rows per page
                        </span>
                        <Select
                            value={pageSize.toString()}
                            onValueChange={(n) =>
                                onPageSizeChange && onPageSizeChange(Number(n))
                            }
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {pageSizeOptions.map((item, idx) => (
                                    <SelectItem key={idx} value={item.toString()}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <span className="inline-flex w-[100px] text-sm font-medium">
                        Page {pageIndex + 1} of {totalPages}
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="hidden lg:flex size-8 p-0"
                            onClick={() =>
                                onPageIndexChange && onPageIndexChange(0)
                            }
                            disabled={pageIndex === 0}
                        >
                            <span className="sr-only">
                                Go to first page
                            </span>
                            <ChevronsLeft className="size-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8 p-0"
                            onClick={() =>
                                onPageIndexChange && onPageIndexChange(pageIndex - 1)
                            }
                            disabled={pageIndex === 0}
                        >
                            <span className="sr-only">
                                Go to previous page
                            </span>
                            <ChevronLeft className="size-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8 p-0"
                            onClick={() =>
                                onPageIndexChange && onPageIndexChange(pageIndex + 1)
                            }
                            disabled={pageIndex === totalPages - 1}
                        >
                            <span className="sr-only">
                                Go to next page
                            </span>
                            <ChevronRight className="size-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8 p-0"
                            onClick={() =>
                                onPageIndexChange && onPageIndexChange(totalPages - 1)
                            }
                            disabled={pageIndex === totalPages - 1}
                        >
                            <span className="sr-only">
                                Go to last page
                            </span>
                            <ChevronsRight className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
)
Pagination.displayName = "Pagination"

export {
    Pagination
}