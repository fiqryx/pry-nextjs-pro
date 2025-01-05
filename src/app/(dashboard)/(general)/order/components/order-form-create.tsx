'use client'
import { z } from "zod"
import React from "react"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { toast } from "@/hooks/use-toast"
import { cn, toDecimal } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input, InputIcon } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    CalendarIcon,
    Edit2Icon,
    ImageIcon,
    PlusCircleIcon
} from "lucide-react"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
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
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const schema = z.object({
    customer: z.string().optional(),
    issueDate: z.date({
        required_error: "Date is required.",
    }),
    orderNo: z.string().optional(),
    country: z.string({
        required_error: 'Country is required'
    }).min(1, 'Country is required'),
    city: z.string({
        required_error: 'City is required'
    }).min(1, 'City is required'),
    address: z.string({
        required_error: 'Address is required'
    }).min(1, 'Address is required'),
    state: z.string({
        required_error: 'State is required'
    }).min(1, 'State is required'),
    zipcode: z.string({ required_error: 'Zip code is required' })
        .min(1, 'Zip code is required')
        .max(6, 'Zip code must be at most 6 digits')
        .regex(/^\d+$/, 'Invalid zip code'),
    taxId: z.string().optional(),
    shipping: z.boolean().optional(),
    deliveryNotes: z.string().optional(),
    items: z.array(z.object({
        name: z.string(),
        qty: z.number(),
        price: z.number(),
        image: z.string().optional()
    })),
    discount: z.number().optional(),
    shippingRate: z.number().optional(),
    taxRate: z.number().optional(),
})


export function OrderFormCreate({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const { setError, ...form } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            issueDate: new Date(),
            items: [
                {
                    name: 'Rustic Concrete Towels',
                    qty: 1,
                    price: 24.99,
                    image: '/assets/product-4.jpg'
                }
            ]
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

    async function onSubmit(data: z.infer<typeof schema>) {
        console.log({ data });
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify({ ...data, ...amount }, null, 2)}
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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
                                        name="orderNo"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="orderNo">
                                                    Number
                                                </FormLabel>
                                                <Input
                                                    disabled
                                                    id="orderNo"
                                                    autoComplete="off"
                                                    placeholder="ORD-001"
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
                                </div>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-5">
                                <h3 className="text-lg font-semibold leading-none tracking-tight">
                                    Billing information
                                </h3>
                                <div className="grid sm:grid-rows-3 sm:grid-flow-col gap-4">
                                    <FormField
                                        name="country"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="country" className="required">
                                                    Country
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger id="country">
                                                        <SelectValue placeholder="Select a country" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Country</SelectLabel>
                                                            <SelectItem value="united states">United States</SelectItem>
                                                            <SelectItem value="germany">Germany</SelectItem>
                                                            <SelectItem value="spain">Spain</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="city"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="city" className="required">
                                                    City
                                                </FormLabel>
                                                <Input id="city" autoComplete="off" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="address"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="address" className="required">
                                                    Address
                                                </FormLabel>
                                                <Input id="address" autoComplete="off" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="state"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="state" className="required">
                                                    State
                                                </FormLabel>
                                                <Input id="state" autoComplete="off" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="zipcode"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="zipcode" className="required">
                                                    Zip code
                                                </FormLabel>
                                                <Input id="zipcode" autoComplete="off" {...field} />
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
                                    Shipping information
                                </h3>
                                <FormField
                                    name="shipping"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                            <Checkbox
                                                id="shipping"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <div className="space-y-1 leading-none">
                                                <FormLabel htmlFor="shipping">
                                                    Same as billing address
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="deliveryNotes"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="deliveryNotes">
                                                Delivery notes
                                            </FormLabel>
                                            <Textarea
                                                id="deliveryNotes"
                                                autoComplete="off"
                                                className="h-24"
                                                placeholder="e.g Leave package at the door"
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-5">
                                <h3 className="text-lg font-semibold leading-none tracking-tight">
                                    Line items
                                </h3>
                                <div className="grid gap-4">
                                    <FormField
                                        name="items"
                                        control={form.control}
                                        render={({ field }) => {
                                            return (
                                                <div className="rounded-md border">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow className="hover:bg-transparent">
                                                                <TableHead>
                                                                    Product
                                                                </TableHead>
                                                                <TableHead>
                                                                    Qty
                                                                </TableHead>
                                                                <TableHead>
                                                                    Unit price
                                                                </TableHead>
                                                                <TableHead></TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {field.value.map((item, idx) => (
                                                                <TableRow key={idx}>
                                                                    <TableCell className="flex items-center gap-1 max-w-xs">
                                                                        <Avatar className="size-10 text-sm rounded-lg">
                                                                            <AvatarImage src={item.image} alt={item.name} />
                                                                            <AvatarFallback className="rounded-lg">
                                                                                <ImageIcon className="text-muted-foreground" />
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                        <span title={item.name} className="truncate text-xs font-semibold">
                                                                            {item.name}
                                                                        </span>
                                                                    </TableCell>
                                                                    <TableCell>{item.qty}</TableCell>
                                                                    <TableCell>${item.price}</TableCell>
                                                                    <TableCell className="text-end">
                                                                        <Button type="button" variant="outline" size="icon">
                                                                            <Edit2Icon />
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            )
                                        }}
                                    />
                                    <Button type="button" variant="outline" className="w-fit">
                                        <PlusCircleIcon /> Add item
                                    </Button>
                                </div>
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
                                                onChange={(e) => form.setValue('discount', parseFloat(e.target.value))}
                                            >
                                                <InputIcon position="left">
                                                    $
                                                </InputIcon>
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
                                                onChange={(e) => form.setValue('shippingRate', parseFloat(e.target.value))}
                                            >
                                                <InputIcon position="left">
                                                    $
                                                </InputIcon>
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
                                                onChange={(e) => form.setValue('taxRate', parseFloat(e.target.value))}
                                            >
                                                <InputIcon position="right">
                                                    %
                                                </InputIcon>
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

                            <div className="flex justify-end mt-2 gap-2">
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