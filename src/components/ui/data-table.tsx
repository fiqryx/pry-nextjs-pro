'use client'
import React from "react"
import { camelCaseToText, cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import {
    Column,
    ColumnDef,
    Table as TanStackTable
} from "@tanstack/react-table"
import {
    CirclePlus,
    ArrowDownIcon,
    ArrowUpIcon,
    ArrowDownUpIcon,
    EyeOffIcon,
    ChevronsLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsRightIcon,
    ChevronDownIcon,
} from "lucide-react"
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface DataTableContextValue {
    table: TanStackTable<any>
}

const DataTableContext = React.createContext<DataTableContextValue | undefined>(undefined)

const useDataTableContext = () => {
    const context = React.useContext(DataTableContext)
    if (!context) {
        throw new Error("Component must be used within a DataTable provider.")
    }
    return context
}

export interface PaginationOptions {
    pageSize: number
    pageIndex: number
    pageSizeOptions?: number[]
}

export type IsPlainObject<T> = T extends object ? T extends any[] ? false
    : T extends Date ? false : T extends (...args: any[]) => any ? false : true : false

export type ExtractNestedKeys<T> = {
    [K in keyof T]: IsPlainObject<T[K]> extends true
    ? `${K & string}` | `${K & string}.${ExtractNestedKeys<T[K]>}`
    : `${K & string}`;
}[keyof T];

export interface DataTableProps<TData, TValue> extends
    React.HTMLAttributes<HTMLDivElement> {
    data: TData[]
    columns: ColumnDef<TData, TValue>[]
    pagination?: boolean,
    paginationOptions?: PaginationOptions,
    hideHeader?: boolean
    columnControl?: boolean
    filter?: Extract<ExtractNestedKeys<TData>, string>[]
    hideColumns?: Extract<ExtractNestedKeys<TData>, string>[]
}


const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<any, any>>(
    ({
        data,
        filter,
        columns,
        columnControl,
        pagination,
        paginationOptions,
        hideHeader,
        hideColumns,
        className,
        ...props
    }, ref) => {
        const [sorting, setSorting] = React.useState<SortingState>([])
        const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
        const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
            () =>
                hideColumns?.reduce((acc, name) => {
                    acc[name] = false;
                    return acc;
                }, {} as VisibilityState) || {}
        );
        const [rowSelection, setRowSelection] = React.useState({})

        const table = useReactTable({
            data,
            columns,
            onSortingChange: setSorting,
            onColumnFiltersChange: setColumnFilters,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            onColumnVisibilityChange: setColumnVisibility,
            onRowSelectionChange: setRowSelection,
            state: {
                sorting,
                columnFilters,
                columnVisibility,
                rowSelection,
                ...(paginationOptions ? {
                    pagination: paginationOptions
                } : {})
            },
        })

        return (
            <div
                ref={ref}
                {...props}
                className={cn('w-full max-w-sm sm:max-w-full', className)}
            >
                <DataTableContext.Provider value={{ table }}>
                    <div className={cn(
                        'rounded-md border',
                        className?.split(' ').filter((v) => v.startsWith('rounded-')).join(' ')
                    )}>
                        {(filter || columnControl) && (
                            <div className={'flex border-b p-2 gap-2'}>
                                {filter && (
                                    <div className="flex items-center flex-wrap gap-2">
                                        {filter?.map((item, idx) => (
                                            <DataTableFilter
                                                key={idx}
                                                size="sm"
                                                filter={item}
                                                variant="outline"
                                            />
                                        ))}
                                        {columnFilters.length > 0 && (
                                            <Button
                                                size="sm"
                                                variant="ghost-primary"
                                                onClick={() => table.resetColumnFilters()}
                                            >
                                                Clear filters
                                            </Button>
                                        )}
                                    </div>
                                )}
                                {columnControl && (
                                    <DataTableColumnControl
                                        size="sm"
                                        variant="outline"
                                        className="ml-auto"
                                    >
                                        Columns{" "}
                                        <ChevronDownIcon className="ml-2 size-4" />
                                    </DataTableColumnControl>
                                )}
                            </div>
                        )}
                        <Table>
                            {!hideHeader && (
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                            )}
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {pagination && (
                        <DataTablePagination pageSizeOptions={paginationOptions?.pageSizeOptions} />
                    )}
                </DataTableContext.Provider>
            </div>
        )
    }
) as <TData, TValue>(props: DataTableProps<TData, TValue> & {
    ref?: React.Ref<HTMLDivElement>
}) => React.JSX.Element
(DataTable as React.FC).displayName = 'DataTable';


export interface DataTableFilter extends
    React.ComponentProps<typeof Button> {
    filter: string
}

const DataTableFilter = React.forwardRef<HTMLButtonElement, DataTableFilter>(
    ({ filter, ...props }, ref) => {
        const { table } = useDataTableContext()
        const column = table.getColumn(filter)

        if (!column) {
            return null
        }

        const label = camelCaseToText(filter).replaceAll('.', ' ')
        const currentFilter = column.getFilterValue() as string

        const [open, setOpen] = React.useState(false)
        const [filterValues, setFilterValues] = React.useState<string>()

        return (
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button ref={ref} {...props}>
                        <CirclePlus className="size-4" />
                        {label} {currentFilter ? `: ${currentFilter}` : ""}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="p-4">
                    <form
                        className="grid w-full max-w-sm items-center gap-2"
                        onSubmit={(e) => {
                            e.preventDefault()
                            column.setFilterValue(filterValues)
                            setOpen(false)
                        }}
                    >
                        <Label htmlFor={filter}>
                            Filter {label}
                        </Label>
                        <Input
                            id={filter}
                            value={filterValues ?? ""}
                            onChange={(e) => setFilterValues(e.target.value)}
                        />
                        <Button type="submit" size="sm">
                            Apply
                        </Button>
                    </form>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
)
DataTableFilter.displayName = 'DataTableFilter';


const DataTableColumnControl = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button>
>(
    (props, ref) => {
        const { table } = useDataTableContext()

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button ref={ref} {...props} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
)
DataTableColumnControl.displayName = 'DataTableColumnControl';

export interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

const DataTableColumnHeader = React.forwardRef<HTMLDivElement, DataTableColumnHeaderProps<any, any>>(
    ({
        column,
        title,
        className,
        ...props
    }, ref) => {
        if (!column.getCanSort()) {
            return <div {...props} className={cn(className)}>{title}</div>
        }

        return (
            <div
                ref={ref}
                {...props}
                className={cn(
                    "flex items-center gap-2",
                    className
                )}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3 h-8 data-[state=open]:bg-accent"
                        >
                            {title}
                            {column.getIsSorted() === "desc" ? (
                                <ArrowDownIcon className="ml-2 size-4" />
                            ) : column.getIsSorted() === "asc" ? (
                                <ArrowUpIcon className="ml-2 size-4" />
                            ) : (
                                <ArrowDownUpIcon className="ml-2 size-4" />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                            <ArrowUpIcon className="mr-2 size-3.5 text-muted-foreground/70" />
                            Asc
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                            <ArrowDownIcon className="mr-2 size-3.5 text-muted-foreground/70" />
                            Desc
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                            <EyeOffIcon className="mr-2 size-3.5 text-muted-foreground/70" />
                            Hide
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    }
) as <TData, TValue>(props: DataTableColumnHeaderProps<TData, TValue> & {
    ref?: React.Ref<HTMLDivElement>
}) => React.JSX.Element
(DataTableColumnHeader as React.FC).displayName = 'DataTableColumnHeader';


export interface DataTablePaginationProps extends
    React.HTMLAttributes<HTMLDivElement> {
    pageSizeOptions?: number[]
}

const DataTablePagination = React.forwardRef<HTMLDivElement, DataTablePaginationProps>(
    ({
        pageSizeOptions = [10, 20, 50],
        className,
        ...props
    }, ref) => {
        const { table } = useDataTableContext()

        return (
            <div
                ref={ref}
                {...props}
                className={cn('flex items-center justify-between flex-wrap p-2 gap-2', className)}
            >
                <div className="flex-1 text-sm text-muted-foreground">
                    {`${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected`}
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">
                            Rows per page
                        </p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {pageSizeOptions.map((item) => (
                                    <SelectItem key={item} value={`${item}`}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">
                                Go to first page
                            </span>
                            <ChevronsLeftIcon className="size-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">
                                Go to prev page
                            </span>
                            <ChevronLeftIcon className="size-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">
                                Go to next page
                            </span>
                            <ChevronRightIcon className="size-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">
                                Go to last page
                            </span>
                            <ChevronsRightIcon className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
)
DataTablePagination.displayName = 'DataTablePagination';

// eslint-disable-next-line
function _renderChildren<T = any>(
    children: React.ReactNode,
    ...displayName: string[]
): { child: React.ReactElement; props: T }[] {
    const results: { child: React.ReactElement; props: T }[] = [];

    React.Children.forEach(children, (child) => {

        if (React.isValidElement(child)) {
            const name = (child.type as React.ComponentType)?.displayName;
            console.log(child.type);

            if (name && displayName.includes(name)) {
                results.push({
                    child,
                    props: child.props as T,
                });
            }
        }
    });

    return results;
}

export {
    DataTable,
    DataTableFilter,
    DataTableColumnControl,
    DataTableColumnHeader,
    DataTablePagination,
}