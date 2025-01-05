'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useFilter } from "../use-filter"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
    Input,
    InputIcon
} from "@/components/ui/input"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    SearchIcon,
    Check,
    ChevronDownIcon,
    CircleXIcon
} from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"


export function JobsFilter({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [filter, setFilter] = useFilter()

    const categories = Object.keys(filter)
    const isFiltered = Object.values(filter).some(
        (filter) => filter.selected && filter.selected.length > 0
    );

    const onFilterChange = React.useCallback((key: string, current: string) => {
        const isSelected = filter[key].selected.includes(current)
        setFilter({
            ...filter,
            [key]: {
                ...filter[key],
                selected: isSelected
                    ? filter[key].selected.filter((v) => v !== current)
                    : [...filter[key].selected, current],
            }
        })
    }, [filter])

    const onRemoveFilter = React.useCallback((key: string, item: string) => {
        setFilter({
            ...filter,
            [key]: {
                ...filter[key],
                selected: filter[key].selected.filter((v) => v !== item)
            }
        })
    }, [filter])

    return (
        <div {...props} className={cn('', className)}>
            <Card>
                <CardContent className="p-0">
                    <Input
                        className="border-none h-12"
                        placeholder="Enter a keyword"
                    >
                        <InputIcon position="left">
                            <SearchIcon />
                        </InputIcon>
                    </Input>
                    <Separator />
                    {isFiltered && (
                        <>
                            <div className="flex flex-wrap gap-2 p-4">
                                {categories.map((key) =>
                                    filter[key].selected.map((item, idx) => (
                                        <Badge
                                            key={idx}
                                            variant="outline"
                                            className="w-fit text-xs font-normal capitalize rounded-full p-2 gap-2"
                                        >
                                            {`${key}: ${item}`}
                                            <button
                                                className="rounded-full hover:bg-accent"
                                                onClick={() => onRemoveFilter(key, item)}
                                            >
                                                <CircleXIcon className="size-4" />
                                            </button>
                                        </Badge>
                                    ))
                                )}
                            </div>
                            <Separator />
                        </>
                    )}
                    <div className="flex flex-wrap px-4 py-2 gap-2">
                        {categories.map((key, idx) => (
                            <Popover key={idx}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        role="combobox"
                                        className="w-fit justify-between capitalize p-2"
                                    >
                                        {key}
                                        <ChevronDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search type..." />
                                        <CommandList>
                                            <CommandEmpty>Not found</CommandEmpty>
                                            <CommandGroup>
                                                {filter[key].items.map((item, idx) => (
                                                    <CommandItem
                                                        key={idx}
                                                        value={item}
                                                        onSelect={(current) => onFilterChange(key, current)}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 size-4",
                                                                filter[key].selected.includes(item)
                                                                    ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {item}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}