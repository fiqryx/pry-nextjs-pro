'use client'
import { z } from "zod"
import React from "react"
import { format } from "date-fns"
import { toast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { cn, toDecimal } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"

import {
    Trash2Icon,
    CalendarIcon,
    PlusCircleIcon,
} from "lucide-react"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Input,
    InputIcon
} from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const schema = z.object({
    invoiceNo: z.string().optional(),
    customer: z.string().optional(),
    issueDate: z.date({
        required_error: 'Issue date is required'
    }),
    dueDate: z.date({
        required_error: 'Due date is required'
    }),
    taxId: z.string().optional(),
    items: z.array(z.object({
        description: z.string().optional(),
        service: z.string({
            required_error: 'Service is required'
        }),
        qty: z.number({
            required_error: 'Quantity is required'
        }).min(1, 'Quantity is required'),
        price: z.number({
            required_error: 'Unit price is required'
        }),
    })),
    discount: z.number({
        required_error: 'Discount is required'
    }),
    shippingRate: z.number({
        required_error: 'Shipping rate price is required'
    }),
    taxRate: z.number({
        required_error: 'Tax rate price is required'
    }),
})


export function InvoiceFormCreate({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const { setError, ...form } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            issueDate: new Date(),
            dueDate: new Date(),
            items: [
                { description: '', service: 'design', qty: 1, price: 14.99 }
            ],
            discount: 0,
            shippingRate: 0,
            taxRate: 0
        },
    })

    const amount = React.useMemo(
        () => {
            const items = form.getValues('items') || [];
            const discount = form.getValues('discount') || 0;
            const shippingRate = form.getValues('shippingRate') || 0;
            const taxRate = form.getValues('taxRate') || 0;

            const subtotal = items.reduce((total, item) => total + (item.qty * item.price), 0);
            const tax = subtotal * (taxRate / 100);
            const total = subtotal - discount + tax + shippingRate;

            return {
                subtotal: toDecimal(subtotal),
                discount: toDecimal(discount),
                shippingRate: toDecimal(shippingRate),
                tax: toDecimal(tax),
                total: toDecimal(total),
            }
        },
        [form.watch(['items', 'discount', 'shippingRate', 'taxRate'])]
    )

    const handleAddItem = React.useCallback(
        () => {
            const items = form.getValues('items')
            items.push({ description: '', service: '', qty: 1, price: 0 })
            form.setValue('items', items)
        },
        [form.watch('items')]
    )

    const handleRemoveItem = React.useCallback(
        (idx: number) => () => {
            const items = form.getValues('items')
            delete items[idx]
            form.setValue('items', items)
        },
        [form.watch('items')]
    )

    async function onSubmit(data: z.infer<typeof schema>) {
        console.log({ data });
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        })
    }

    return (
        <div {...props} className={cn('', className)}>
            <Card>
                <CardContent className="py-6">
                    <Form setError={setError} {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
                            <div className="flex flex-col gap-5">
                                <h3 className="text-lg font-semibold leading-none tracking-tight">
                                    Basic information
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        name="customer"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="customer">
                                                    Customer
                                                </FormLabel>
                                                <Input id="customer" autoComplete="off" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="invoiceNo"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="invoiceNo">
                                                    Number
                                                </FormLabel>
                                                <Input
                                                    disabled
                                                    id="invoiceNo"
                                                    autoComplete="off"
                                                    placeholder="INV-001"
                                                    {...field}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="issueDate"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-2">
                                                <FormLabel htmlFor="issueDate">
                                                    Issue date
                                                </FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            id="issueDate"
                                                            variant={"outline"}
                                                            className={cn(
                                                                "xmax-w-xs pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? format(field.value, "LLL dd, y") : 'Pick a date'}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            initialFocus
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="dueDate"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-2">
                                                <FormLabel htmlFor="dueDate">
                                                    Due date
                                                </FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            id="dueDate"
                                                            variant={"outline"}
                                                            className={cn(
                                                                "xmax-w-xs pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? format(field.value, "LLL dd, y") : 'Pick a date'}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="taxId"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="taxId">
                                                    Tax ID
                                                </FormLabel>
                                                <Input id="taxId" autoComplete="off" placeholder="e.g EU372054390" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-5">
                                <h3 className="text-lg font-semibold leading-none tracking-tight">
                                    Line items
                                </h3>
                                <FormField
                                    name="items"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            {field.value.map((item, idx) => (
                                                <div key={idx} className="grid gap-4">
                                                    <div className="grid sm:grid-cols-5 gap-4">
                                                        <FormItem className="sm:col-span-2">
                                                            <FormLabel htmlFor="description">
                                                                Description
                                                            </FormLabel>
                                                            <Input
                                                                id="description"
                                                                autoComplete="off"
                                                                value={item.description}
                                                                onChange={(e) => {
                                                                    field.value[idx].description = e.target.value
                                                                    field.onChange(field.value)
                                                                }}
                                                            />
                                                            <FormMessage />
                                                        </FormItem>
                                                        <FormItem>
                                                            <FormLabel htmlFor="service">
                                                                Service
                                                            </FormLabel>
                                                            <Select
                                                                value={item.service}
                                                                onValueChange={(value) => {
                                                                    field.value[idx].service = value
                                                                    field.onChange(field.value)
                                                                }}
                                                            >
                                                                <SelectTrigger id="service">
                                                                    <SelectValue placeholder="Select a service" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Select a service</SelectLabel>
                                                                        <SelectItem value="design">Design</SelectItem>
                                                                        <SelectItem value="development">Development</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                        <FormItem>
                                                            <FormLabel htmlFor="qty">
                                                                Quantity
                                                            </FormLabel>
                                                            <Input
                                                                min={1}
                                                                id="qty"
                                                                type="number"
                                                                autoComplete="off"
                                                                value={!isNaN(item.qty) ? item.qty : ''}
                                                                onChange={(e) => {
                                                                    field.value[idx].qty = parseInt(e.target.value)
                                                                    field.onChange(field.value)
                                                                }}
                                                            />
                                                            <FormMessage />
                                                        </FormItem>
                                                        <div className="flex items-end gap-2">
                                                            <FormItem>
                                                                <FormLabel htmlFor="unitPrice">
                                                                    Unit price
                                                                </FormLabel>
                                                                <Input
                                                                    min={0}
                                                                    step="0.01"
                                                                    type="number"
                                                                    id="unitPrice"
                                                                    autoComplete="off"
                                                                    value={!isNaN(item.price) ? item.price : ''}
                                                                    onChange={(e) => {
                                                                        field.value[idx].price = parseFloat(e.target.value)
                                                                        field.onChange(field.value)
                                                                    }}
                                                                >
                                                                    <InputIcon position="left">$</InputIcon>
                                                                </Input>
                                                                <FormMessage />
                                                            </FormItem>
                                                            <Button
                                                                size="icon"
                                                                type="button"
                                                                variant="outline"
                                                                onClick={handleRemoveItem(idx)}
                                                            >
                                                                <Trash2Icon />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <Separator />
                                                </div>
                                            ))}
                                        </>
                                    )}
                                />
                                <Button
                                    type="button"
                                    onClick={handleAddItem}
                                    variant="outline"
                                    className="w-fit"
                                >
                                    <PlusCircleIcon /> Add item
                                </Button>
                            </div>
                            <Separator />
                            <div className="grid sm:grid-cols-3 gap-4">
                                <FormField
                                    name="discount"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="discount">
                                                Discount
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                min={0}
                                                step="0.01"
                                                id="discount"
                                                type="number"
                                                autoComplete="off"
                                                value={!isNaN(field.value) ? field.value : ''}
                                                onChange={(e) => form.setValue('discount', parseFloat(e.target.value))}
                                            >
                                                <InputIcon position="left">$</InputIcon>
                                            </Input>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="shippingRate"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="shippingRate">
                                                Shipping rate
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                min={0}
                                                step="0.01"
                                                type="number"
                                                id="shippingRate"
                                                autoComplete="off"
                                                value={!isNaN(field.value) ? field.value : ''}
                                                onChange={(e) => form.setValue('shippingRate', parseFloat(e.target.value))}
                                            >
                                                <InputIcon position="left">$</InputIcon>
                                            </Input>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="taxRate"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="taxRate">
                                                Tax rate (%)
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                min={0}
                                                id="taxRate"
                                                type="number"
                                                autoComplete="off"
                                                value={!isNaN(field.value) ? field.value : ''}
                                                onChange={(e) => form.setValue('taxRate', parseFloat(e.target.value))}
                                            >
                                                <InputIcon position="right">%</InputIcon>
                                            </Input>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Separator />
                            <div className="flex justify-end">
                                <div className="w-full max-w-sm flex flex-col text-xs gap-4">
                                    <div className="flex justify-between gap-2">
                                        <span className="text-muted-foreground">
                                            Subtotal
                                        </span>
                                        <span>{amount.subtotal ? `$${amount.subtotal}` : '-'}</span>
                                    </div>
                                    <div className="flex justify-between gap-2">
                                        <span className="text-muted-foreground">
                                            Discount
                                        </span>
                                        <span>
                                            {amount.discount ? `$${amount.discount}` : '-'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-2">
                                        <span className="text-muted-foreground">
                                            Shipping
                                        </span>
                                        <span>
                                            {amount.shippingRate ? `$${amount.shippingRate}` : '-'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-2">
                                        <span className="text-muted-foreground">
                                            Taxes
                                        </span>
                                        <span>{amount.tax ? `$${amount.tax}` : '-'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm gap-2">
                                        <span className="text-muted-foreground font-bold">
                                            Total
                                        </span>
                                        <span>{amount.total ? `$${amount.total}` : '-'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="ghost">
                                    Cancel
                                </Button>
                                <Button type="submit" className="px-6">
                                    Create
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}