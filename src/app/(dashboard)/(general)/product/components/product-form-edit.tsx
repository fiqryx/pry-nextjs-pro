'use client'
import { z } from "zod"
import React from "react"
import { cn } from "@/lib/utils"
import { Editor } from '@tiptap/react'
import { toast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { useProduct } from "../use-product"
import { FileRejection } from "react-dropzone"
import { zodResolver } from "@hookform/resolvers/zod"

import { Badge } from "@/components/ui/badge"
import { Input, InputIcon } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { MinimalTiptapEditor } from "@/components/minimal-tiptap"

import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Dropzone,
    DropzoneContent
} from "@/components/ui/dropzone"
import {
    Trash2,
    InfoIcon,
    ImageIcon,
    CloudUpload,
} from "lucide-react"
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
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
    sku: z.string({ required_error: 'Name is required' })
        .min(1, 'SKU is required'),
    handle: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    type: z.string().optional(),
    tags: z.string().optional(),
    currency: z.string().optional(),
    price: z.number().optional(),
    barcode: z.string().optional(),
    height: z.number().optional(),
    width: z.number().optional(),
    length: z.number().optional(),
    weight: z.number().optional(),
    backOrder: z.boolean().optional(),
    images: z.array(z.any()).optional()
})

export function ProductFormEdit({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [product] = useProduct()

    if (!product) {
        return null
    }

    const editorRef = React.useRef<Editor | null>(null)
    const { setError, ...form } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...product,
            currency: 'usd',
            price: 24,
            images: [
                new File([], "product-1.jpg", { type: "image/jpg" })
            ]
        },
    })

    /* handle tiptap */
    const handleCreate = React.useCallback(
        ({ editor }: { editor: Editor }) => {
            if (form.getValues('description') && editor.isEmpty) {
                editor.commands.setContent(form.getValues('description') ?? null)
            }
            editorRef.current = editor
        },
        [form]
    )

    /* handle image drop */
    const handleDrop = React.useCallback(
        (accepted: File[], rejected: FileRejection[]) => {
            console.log({ rejected });
            const prevImages = form.getValues('images') || [];
            form.setValue('images', [...prevImages, ...accepted])
        },
        [form]
    )

    /* handle image remove */
    const handleRemove = React.useCallback(
        (idx: number) => () => {
            const prevImages = form.getValues('images') || [];
            const updatedImages = prevImages.filter((_, i) => i !== idx)
            form.setValue('images', updatedImages)
        },
        [form]
    )

    async function onSubmit(data: z.infer<typeof schema>) {
        console.log({ data });
        const images = data.images?.map(v => v.name)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify({ ...data, images }, null, 2)}
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
                                        name="name"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="name" className="required">
                                                    Product name
                                                </FormLabel>
                                                <Input id="name" autoComplete="off" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="handle"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="handle">
                                                    Handle
                                                </FormLabel>
                                                <Input id="handle" autoComplete="off" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="category"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="category">
                                                    Category
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger id="category">
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Select a category</SelectLabel>
                                                            <SelectItem value="healthcare">Healthcare</SelectItem>
                                                            <SelectItem value="makeup">Makeup</SelectItem>
                                                            <SelectItem value="skincare">Skincare</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="type"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="type">
                                                    Type
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger id="type">
                                                        <SelectValue placeholder="Select a type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Select a type</SelectLabel>
                                                            <SelectItem value="physical">Physical</SelectItem>
                                                            <SelectItem value="digital">Digital</SelectItem>
                                                            <SelectItem value="service">Service</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    name="description"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Description
                                            </FormLabel>
                                            <MinimalTiptapEditor
                                                {...field}
                                                editable
                                                injectCSS
                                                output="html"
                                                immediatelyRender
                                                throttleDelay={0}
                                                onCreate={handleCreate}
                                                editorClassName="focus:outline-none p-5"
                                                placeholder="Type your description here..."
                                                className={cn('w-full focus-within:border-ring', {
                                                    'border-destructive focus-within:border-destructive': form.formState.errors.description
                                                })}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="tags"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="tags">
                                                Tags
                                            </FormLabel>
                                            <Input
                                                id="tags"
                                                autoComplete="off"
                                                placeholder="e.g Modern, Clean, etc"
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
                                    Pricing
                                </h3>
                                <div className="flex gap-5">
                                    <FormField
                                        name="currency"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="w-40">
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
                                                            <SelectItem value="usd">USD</SelectItem>
                                                            <SelectItem value="eur">EUR</SelectItem>
                                                            <SelectItem value="ron">RON</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="price"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="w-40">
                                                <FormLabel htmlFor="price">
                                                    Price
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    min={0}
                                                    id="price"
                                                    step="0.01"
                                                    type="number"
                                                    autoComplete="off"
                                                    onChange={(e) => form.setValue('price', parseFloat(e.target.value))}
                                                >
                                                    <InputIcon position="left">$</InputIcon>
                                                </Input>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-5">
                                <h3 className="text-lg font-semibold leading-none tracking-tight">
                                    Images
                                </h3>
                                <FormField
                                    name="images"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Table className="border">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[100px]">
                                                        Image
                                                    </TableHead>
                                                    <TableHead>
                                                        File name
                                                    </TableHead>
                                                    <TableHead />
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {field.value?.length ? (
                                                    field.value.map((item, idx) => {
                                                        const src = URL.createObjectURL(item)
                                                        return (
                                                            <TableRow key={idx}>
                                                                <TableCell className="font-medium">
                                                                    <Avatar className="size-10 text-sm rounded-lg">
                                                                        <AvatarImage
                                                                            alt={item.name}
                                                                            onLoad={() => URL.revokeObjectURL(src)}
                                                                            src={item.name === 'product-1.jpg' ? product.images?.[0].src : src}
                                                                        />
                                                                        <AvatarFallback className="rounded-lg">
                                                                            <ImageIcon className="text-muted-foreground" />
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                </TableCell>
                                                                <TableCell>{item.name}</TableCell>
                                                                <TableCell className="text-right">
                                                                    <Button type="button" onClick={handleRemove(idx)} size="icon" variant="outline">
                                                                        <Trash2 />
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={3} className="text-center">
                                                            No images
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    )}
                                />

                                <Dropzone
                                    multiple
                                    className="h-40"
                                    onDrop={handleDrop}
                                    accept={{
                                        "image/jpeg": [".*"],
                                        "image/png": [".png"],
                                        "image/gif": [".gif"],
                                        "image/svg+xml": [".svg"],
                                    }}
                                >
                                    <DropzoneContent className="flex justify-center items-center gap-5">
                                        <Badge variant="outline" className="rounded-full p-6">
                                            <CloudUpload className="size-6" />
                                        </Badge>
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-lg font-semibold leading-none tracking-tight">
                                                <span className="underline underline-offset-4">Click to upload</span>
                                                {" "}or drag and drop
                                            </p>
                                            <p className="text-sm text-muted-foreground leading-none tracking-tight">
                                                (SVG, JPG, PNG, or gif maximum 900x400)
                                            </p>
                                        </div>
                                    </DropzoneContent>
                                </Dropzone>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-5">
                                <h3 className="text-lg font-semibold leading-none tracking-tight">
                                    Stock & Inventory
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        name="sku"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="sku" className="required">
                                                    Stock keeping unit (SKU)
                                                </FormLabel>
                                                <Input id="sku" autoComplete="off" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="barcode"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="barcode">
                                                    Barcode (EAN)
                                                </FormLabel>
                                                <Input id="barcode" autoComplete="off" placeholder="e.g 0012345689012" {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    name="backOrder"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                            <Checkbox
                                                id="backOrder"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <div className="space-y-1 leading-none">
                                                <FormLabel htmlFor="backOrder">
                                                    Allow backorders
                                                </FormLabel>
                                            </div>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <InfoIcon className="text-muted-foreground size-3 -ml-1" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Keep selling</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </FormItem>
                                    )}
                                />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        name="height"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="height">
                                                    Height
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    id="height"
                                                    step="0.01"
                                                    type="number"
                                                    autoComplete="off"
                                                    onChange={(e) => form.setValue('height', parseFloat(e.target.value))}
                                                >
                                                    <InputIcon position="right">
                                                        cm
                                                    </InputIcon>
                                                </Input>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="width"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="width">
                                                    Width
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    id="width"
                                                    step="0.01"
                                                    type="number"
                                                    autoComplete="off"
                                                    onChange={(e) => form.setValue('width', parseFloat(e.target.value))}
                                                >
                                                    <InputIcon position="right">
                                                        cm
                                                    </InputIcon>
                                                </Input>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="length"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="length">
                                                    Length
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    id="length"
                                                    step="0.01"
                                                    type="number"
                                                    autoComplete="off"
                                                    onChange={(e) => form.setValue('length', parseFloat(e.target.value))}
                                                >
                                                    <InputIcon position="right">
                                                        cm
                                                    </InputIcon>
                                                </Input>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="weight"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="weight">
                                                    Weight
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    id="weight"
                                                    step="0.01"
                                                    type="number"
                                                    autoComplete="off"
                                                    onChange={(e) => form.setValue('weight', parseFloat(e.target.value))}
                                                >
                                                    <InputIcon position="right">
                                                        kg
                                                    </InputIcon>
                                                </Input>
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
                                    Save changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}