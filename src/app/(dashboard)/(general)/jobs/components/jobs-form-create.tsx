'use client'
import { z } from "zod"
import React from "react"
import { cn } from "@/lib/utils"
import { useStep } from "../use-step"
import { Editor } from '@tiptap/react'
import { toast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { addDays, format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"

import { Badge } from "@/components/ui/badge"
import { Input, InputIcon } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { MinimalTiptapEditor } from "@/components/minimal-tiptap"

import {
    RadioGroup,
    RadioGroupItem
} from "@/components/ui/radio-group"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    CalendarIcon,
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CircleXIcon,
} from "lucide-react"
import {
    Step,
    StepWrapper,
    StepIndicator,
    StepItem,
    StepLabel,
    StepContent
} from "@/components/ui/step";

type StepFormProps = {
    form: ReturnType<typeof useForm>
}

type StepMap = {
    label: string
    component: (props: StepFormProps) => React.JSX.Element
}

const steps: StepMap[] = [
    {
        label: 'Category',
        component: Step1
    },
    {
        label: 'Job details',
        component: Step2
    },
    {
        label: 'Description',
        component: Step3
    },
]

const schema = z.object({
    category: z.string().optional(),
    title: z.string().min(
        1, 'Title is required'
    ).optional(),
    tags: z.array(z.string()).optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    budgetMin: z.number().min(
        1, 'Budget min is required'
    ).optional(),
    budgetMax: z.number().min(
        1, 'Budget max is required'
    ).optional(),
    describe: z.string().optional(),
})

export function JobsFormCreate({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [step] = useStep()
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            category: 'contract',
            tags: [],
            startDate: new Date(),
            endDate: addDays(new Date(), 30)
        },
    })

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
        <div {...props} className={cn('w-full', className)}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex-1 p-4 sm:p-8">
                    <Step
                        step={step}
                        variant="outline"
                    >
                        {steps.map((item, idx) => (
                            <StepItem
                                key={idx}
                                hideLine={idx === steps.length - 1}
                            >
                                <StepWrapper>
                                    <StepIndicator>
                                        {step <= idx ? idx + 1 : <CheckIcon />}
                                    </StepIndicator>
                                    <StepContent>
                                        <StepLabel className="mt-2 text-sm font-normal left-6">
                                            {item.label}
                                        </StepLabel>
                                        <item.component form={form} />
                                    </StepContent>
                                </StepWrapper>
                            </StepItem>
                        ))}
                    </Step>
                </form>
            </Form>
        </div>
    )
}

function StepController() {
    const [step, setStep] = useStep()

    return (
        <div className="w-full flex justify-end gap-2">
            <Button
                type="button"
                variant="ghost"
                className={`w-fit ${!step ? 'hidden' : ''}`}
                onClick={() => step && setStep(step - 1)}
            >
                <ChevronLeftIcon />
                Back
            </Button>
            <Button
                className="w-fit"
                type={step < steps.length - 1 ? 'button' : 'submit'}
                onClick={() =>
                    step < steps.length - 1 ? setStep(step + 1) : undefined
                }
            >
                {step >= steps.length - 1 ? 'Create job' : (
                    <>
                        Continue
                        <ChevronRightIcon />
                    </>
                )}
            </Button>
        </div>
    )
}

function Step1({ form }: StepFormProps) {
    return (
        <div className="grid my-6 gap-4">
            <h1 className="font-semibold tracking-tight">
                I&apos;m looking for...
            </h1>
            <div className="grid gap-2">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormLabel
                                        htmlFor="freelance"
                                        className="flex items-center space-x-3 space-y-0 p-4 border border-input hover:border-primary rounded-lg cursor-pointer disabled:cursor-default"
                                    >
                                        <FormControl>
                                            <RadioGroupItem
                                                id="freelance"
                                                value="freelance"
                                                className="border-input w-5 h-5"
                                            />
                                        </FormControl>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-normal">Freelancer</span>
                                            <span className="text-xs text-muted-foreground">
                                                Best for small, friendly-pocket projects
                                            </span>
                                        </div>
                                    </FormLabel>

                                    <FormLabel
                                        htmlFor="contract"
                                        className="flex items-center space-x-3 space-y-0 p-4 border border-input hover:border-primary rounded-lg cursor-pointer disabled:cursor-default"
                                    >
                                        <FormControl>
                                            <RadioGroupItem
                                                id="contract"
                                                value="contract"
                                                className="border-input w-5 h-5"
                                            />
                                        </FormControl>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-normal">
                                                Contractors
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                Limited-time projects with highly experienced individuals
                                            </span>
                                        </div>
                                    </FormLabel>

                                    <FormLabel
                                        htmlFor="employee"
                                        className="flex items-center space-x-3 space-y-0 p-4 border border-input rounded-lg bg-muted"
                                    >
                                        <FormControl>
                                            <RadioGroupItem
                                                disabled
                                                id="employee"
                                                value="employee"
                                                className="border-muted-foreground w-5 h-5"
                                            />
                                        </FormControl>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-normal text-muted-foreground">
                                                Employees
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                Unlimited term contracts
                                            </span>
                                        </div>
                                    </FormLabel>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <StepController />
        </div>
    )
}

function Step2({ form }: StepFormProps) {
    const [tempTag, setTempTag] = React.useState("")

    return (
        <div className="grid my-6 gap-4">
            <div className="grid gap-4">
                <h4 className="font-semibold tracking-tight">
                    What is the job about?
                </h4>
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="title">
                                Title
                            </FormLabel>
                            <Input
                                id="title"
                                autoComplete="off"
                                placeholder="e.g Salesforce Analyst"
                                {...field}
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
                                {...field}
                                id="tags"
                                autoComplete="off"
                                value={tempTag}
                                onChange={(e) => setTempTag(e.target.value)}
                            >
                                <InputIcon position="right">
                                    <Button
                                        size="sm"
                                        type="button"
                                        variant="ghost"
                                        onClick={() => {
                                            if (tempTag) {
                                                field.onChange([...field.value, tempTag.trim()])
                                                setTempTag("")
                                            }
                                        }}
                                    >
                                        Add
                                    </Button>
                                </InputIcon>
                            </Input>
                            <FormMessage />
                            {field.value?.length > 0 && (
                                <div className="flex flex-wrap gap-2 py-2">
                                    {(field.value as string[]).map((item, idx) => (
                                        <Badge
                                            key={idx}
                                            variant="outline"
                                            className="w-fit text-xs font-normal capitalize rounded-full p-1 gap-2"
                                        >
                                            {item}
                                            <button
                                                type="button"
                                                className="rounded-full hover:bg-accent"
                                                onClick={() =>
                                                    field.onChange(field.value.filter((v: string) => v != item))
                                                }
                                            >
                                                <CircleXIcon className="size-4" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid gap-4">
                <h4 className="font-semibold tracking-tight">
                    When is the project starting?
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                        name="startDate"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel htmlFor="startDate">
                                    Start date
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="startDate"
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
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="endDate"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel htmlFor="endDate">
                                    End date
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="endDate"
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
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <h4 className="font-semibold tracking-tight">
                    What is the budget?
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                        name="budgetMin"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="budgetMin">
                                    Minimum
                                </FormLabel>
                                <Input
                                    {...field}
                                    min={0}
                                    step="0.01"
                                    id="budgetMin"
                                    type="number"
                                    autoComplete="off"
                                    onChange={(e) => form.setValue('budgetMin', parseFloat(e.target.value))}
                                >
                                    <InputIcon position="left">$</InputIcon>
                                </Input>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="budgetMax"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="budgetMax">
                                    Maximum
                                </FormLabel>
                                <Input
                                    {...field}
                                    min={0}
                                    step="0.01"
                                    type="number"
                                    id="budgetMax"
                                    autoComplete="off"
                                    onChange={(e) => form.setValue('budgetMax', parseFloat(e.target.value))}
                                >
                                    <InputIcon position="left">$</InputIcon>
                                </Input>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <StepController />
        </div>
    )
}

function Step3({ form }: StepFormProps) {
    const editorRef = React.useRef<Editor | null>(null)

    const handleCreate = React.useCallback(
        ({ editor }: { editor: Editor }) => {
            if (form.getValues('describe') && editor.isEmpty) {
                editor.commands.setContent(form.getValues('describe') ?? null)
            }
            editorRef.current = editor
        },
        [form]
    )

    return (
        <div className="grid my-6 gap-4">
            <h1 className="font-semibold tracking-tight">
                How would you describe the job post?
            </h1>
            <div className="grid gap-2">
                <FormField
                    name="describe"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <MinimalTiptapEditor
                                {...field}
                                editable
                                injectCSS
                                output="html"
                                immediatelyRender
                                throttleDelay={0}
                                onCreate={handleCreate}
                                editorClassName="focus:outline-none p-5"
                                placeholder="Type your describe here..."
                                className={cn('w-full focus-within:border-ring', {
                                    'border-destructive focus-within:border-destructive': form.formState.errors.description
                                })}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <StepController />
        </div>
    )
}
