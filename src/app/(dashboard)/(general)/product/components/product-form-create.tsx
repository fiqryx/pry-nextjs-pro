'use client'
import { z } from "zod"
import React from "react"
import { cn } from "@/lib/utils"
import { Editor } from '@tiptap/react'
import { useForm } from "react-hook-form"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap"

import {
    Card,
    CardContent
} from "@/components/ui/card"
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
    handle: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    type: z.string().optional(),
    tags: z.string().optional(),
})

export function ProductFormCreate({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const editorRef = React.useRef<Editor | null>(null)
    const { setError, ...form } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            handle: '',
            category: '',
            type: 'physical',
            description: '',
            tags: ''
        },
    })

    const handleCreate = React.useCallback(
        ({ editor }: { editor: Editor }) => {
            if (form.getValues('description') && editor.isEmpty) {
                editor.commands.setContent(form.getValues('description') ?? null)
            }
            editorRef.current = editor
        },
        [form]
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
                                                editorClassName="focus:outline-hidden p-5"
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
                                            <Input id="tags" autoComplete="off" placeholder="e.g Modern, Clean, etc" {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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