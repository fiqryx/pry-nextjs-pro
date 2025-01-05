'use client'
import { z } from "zod"
import React from "react"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"

import { CameraIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator";

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
    name: z.string({ required_error: 'Name is required' })
        .min(1, 'Name is required'),
    email: z.string({ required_error: 'Email is required' })
        .email('invalid email'),
    photo: z.any().optional(),
    phone: z.string({ required_error: 'Phone is required' })
        .min(1, 'Phone is required'),
    company: z.string().optional(),
    country: z.string({ required_error: 'Country is required' })
        .min(1, 'Country is required'),
    city: z.string({ required_error: 'City is required' })
        .min(1, 'City is required'),
    address: z.string({ required_error: 'Address is required' })
        .min(1, 'Address is required'),
    state: z.string({ required_error: 'State is required' })
        .min(1, 'State is required'),
    zipcode: z.string({ required_error: 'Zip code is required' })
        .min(1, 'Zip code is required')
        .max(6, 'Zip code must be at most 6 digits')
        .regex(/^\d+$/, 'Invalid zip code'),
    taxId: z.string().optional(),
    shipping: z.boolean().optional(),
    timezone: z.string({ required_error: 'Timezone is required' })
        .min(1, 'Timezone is required'),
    language: z.string({ required_error: 'Language is required' })
        .min(1, 'Language is required'),
    currency: z.string().optional()
})

export function CustomerForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const photoRef = React.useRef<HTMLInputElement>(null)
    const { setError, ...form } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            shipping: true,
            currency: 'USD'
        },
    })

    async function onSubmit(data: z.infer<typeof schema>) {
        console.log({ data });
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify({ ...data, photo: data.photo?.name }, null, 2)}
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
                                <h3 className="font-semibold leading-none tracking-tight">
                                    Account information
                                </h3>
                                <FormField
                                    name="photo"
                                    control={form.control}
                                    render={({ field }) => (
                                        <div className="flex gap-4">
                                            <Avatar
                                                onClick={() => photoRef.current?.click()}
                                                className="h-24 w-24 rounded-full border border-dashed p-0.5 cursor-pointer"
                                            >
                                                <AvatarImage className="rounded-full" src={field.value ? URL.createObjectURL(field.value) : undefined} />
                                                <AvatarFallback className="rounded-full hover:bg-muted/70">
                                                    <CameraIcon />
                                                </AvatarFallback>
                                                <Input
                                                    type="file"
                                                    ref={photoRef}
                                                    name={field.name}
                                                    className="hidden"
                                                    accept="image/jpeg,image/png"
                                                    onChange={(e) => {
                                                        field.onChange(e.target?.files?.[0] ?? undefined);
                                                    }}
                                                />
                                            </Avatar>
                                            <div className="flex-1 space-y-4">
                                                <h6 className="text-sm font-bold tracking-tight">Photo</h6>
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-xs text-muted-foreground">Min 400x400px, PNG or JPEG</p>
                                                    <FormMessage />
                                                    <Button
                                                        size="sm"
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => photoRef.current?.click()}
                                                    >
                                                        Select
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        name="name"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="name" className="required">
                                                    Name
                                                </FormLabel>
                                                <Input id="name" autoComplete="off" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="email"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="email" className="required">
                                                    Email
                                                </FormLabel>
                                                <Input id="email" type="email" autoComplete="off" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="phone"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="phone" className="required">
                                                    Phone
                                                </FormLabel>
                                                <Input id="phone" type="tel" autoComplete="off" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="company"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="company">
                                                    Company
                                                </FormLabel>
                                                <Input id="company" autoComplete="off" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-5">
                                <h3 className="font-semibold leading-none tracking-tight">
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
                                                            <SelectLabel>Select a country</SelectLabel>
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
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-5">
                                <h3 className="text-lg font-semibold leading-none tracking-tight">
                                    Additional information
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        name="timezone"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="timezone" className="required">
                                                    Timezone
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger id="timezone">
                                                        <SelectValue placeholder="Select a timezone" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Select a timezone</SelectLabel>
                                                            <SelectItem value="new_york">US - New York</SelectItem>
                                                            <SelectItem value="california">US - California</SelectItem>
                                                            <SelectItem value="london">UK - London</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="language"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="language" className="required">
                                                    Language
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger id="language">
                                                        <SelectValue placeholder="Select a language" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Select a language</SelectLabel>
                                                            <SelectItem value="english">English</SelectItem>
                                                            <SelectItem value="german">German</SelectItem>
                                                            <SelectItem value="spanish">Spanish</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="currency"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="currency">
                                                    Currency
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger id="currency">
                                                        <SelectValue placeholder="Select a currency" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Select a currency</SelectLabel>
                                                            <SelectItem value="USD">USD</SelectItem>
                                                            <SelectItem value="EUR">EUR</SelectItem>
                                                            <SelectItem value="RON">RON</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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