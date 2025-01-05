'use client'
import React from "react"
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from "class-variance-authority"

type StepSize = 'default' | 'sm' | 'lg'

type StepVariant = 'default' | 'destructive' | 'secondary' | 'outline'

interface StepContextValue {
    step: number
    onStepChange?: (step: number) => void
    childIndex: number
    size?: StepSize
    variant?: StepVariant
}

const StepContext = React.createContext<StepContextValue | undefined>(undefined)

const useStepContext = () => {
    const context = React.useContext(StepContext)
    if (!context) {
        throw new Error("Step components must be used within a Step provider.")
    }
    return context
}

export interface StepProps extends React.HTMLAttributes<HTMLOListElement> {
    step?: number
    onStepChange?: (step: number) => void
    size?: StepSize
    variant?: StepVariant
}

const Step = React.forwardRef<HTMLOListElement, StepProps>(
    ({ className, step = 0, onStepChange, size, variant, children, ...props }, ref) => (
        <ol
            {...props}
            ref={ref}
            className={cn('group overflow-hidden space-y-8', className)}
        >
            {React.Children.map(children, (child, childIndex) =>
                React.isValidElement(child) ? (
                    <StepContext.Provider value={{
                        step,
                        size,
                        variant,
                        childIndex,
                        onStepChange
                    }}>
                        {child}
                    </StepContext.Provider>
                ) : child
            )}
        </ol>
    )
)
Step.displayName = "Step"

const stepItemVariants = cva(
    "relative flex-1 after:content-[''] after:w-0.5 after:h-full after:inline-block after:absolute after:bg-accent",
    {
        variants: {
            variant: {
                default: 'data-[active=true]:after:bg-primary',
                destructive: 'data-[active=true]:after:bg-destructive',
                secondary: 'data-[active=true]:after:bg-secondary',
                outline: 'data-[active=true]:after:bg-primary',
            },
            size: {
                sm: 'after:-bottom-8 lg:after:-bottom-10 after:left-3 lg:after:left-4',
                default: 'after:-bottom-10 lg:after:-bottom-11 after:left-4 lg:after:left-5',
                lg: 'after:-bottom-11 lg:after:-bottom-14 after:left-5 lg:after:left-6',
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

export interface StepItemProps extends
    React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof stepItemVariants> {
    hideLine?: boolean
}

const StepItem = React.forwardRef<
    HTMLLIElement,
    StepItemProps
>(({ className, variant, size, hideLine, ...props }, ref) => {
    const {
        step,
        size: parrentSize,
        variant: parrentVariant,
        childIndex
    } = useStepContext()

    size = size ?? parrentSize
    variant = variant ?? parrentVariant

    return (
        <li
            {...props}
            ref={ref}
            data-active={step >= childIndex}
            className={cn(
                stepItemVariants({ variant, size, className }),
                hideLine && 'after:content-none'
            )}
        />
    )
})
StepItem.displayName = "StepItem"


const StepWrapper = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        className={cn('flex items-start w-full gap-3', className)}
    />
))
StepWrapper.displayName = "StepWrapper"


const stepIndicatorVariants = cva(
    'border-2 border-transparent rounded-full flex justify-center items-center aspect-square bg-background transition-all duration-300',
    {
        variants: {
            variant: {
                default: 'border-primary data-[active=true]:bg-primary text-foreground data-[active=true]:text-primary-foreground',
                destructive: 'border-destructive data-[active=true]:bg-destructive data-[active=true]:text-destructive-foreground',
                secondary: 'border-secondary data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground',
                outline: 'border-input data-[active=true]:border-primary data-[active=true]:text-primary',
            },
            size: {
                sm: 'text-xs w-6 h-6 lg:w-8 lg:h-8',
                default: 'text-default w-8 h-8 lg:w-10 lg:h-10',
                lg: 'text-lg w-10 h-10 lg:w-12 lg:h-12'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

export interface StepIndicatorProps extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepIndicatorVariants> {
    disabled?: boolean
}

const StepIndicator = React.forwardRef<
    HTMLDivElement,
    StepIndicatorProps
>(({ className, variant, size, disabled, ...props }, ref) => {
    const {
        step,
        size: parrentSize,
        variant: parrentVariant,
        childIndex,
        onStepChange
    } = useStepContext()

    size = size ?? parrentSize
    variant = variant ?? parrentVariant

    return (
        <div
            {...props}
            ref={ref}
            data-active={step >= childIndex}
            className={cn(
                stepIndicatorVariants({ variant, size, className }),
                !disabled && onStepChange && 'cursor-pointer'
            )}
            onClick={() => !disabled && onStepChange && onStepChange(childIndex)}
        />
    )
})
StepIndicator.displayName = "StepIndicator"


const StepContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { step, childIndex } = useStepContext()

    return (
        <div
            {...props}
            ref={ref}
            className={cn('flex flex-col w-full gap-2', className)}
        >
            {step === childIndex ? children : (
                React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        const displayName = (child.type as React.ComponentType)?.displayName;
                        return displayName === "StepLabel" || displayName === "StepDescription" ? child : null;
                    }
                })
            )}
        </div>
    )
})
StepContent.displayName = "StepContent"


const StepLabel = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        {...props}
        ref={ref}
        className={cn(
            'font-semibold leading-none tracking-tight',
            className
        )}
    />
))
StepLabel.displayName = "StepLabel"


const StepDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        {...props}
        ref={ref}
        className={cn(
            'text-sm text-muted-foreground',
            className
        )}
    />
))
StepDescription.displayName = "StepDescription"

export {
    Step,
    StepItem,
    stepItemVariants,
    StepWrapper,
    StepIndicator,
    stepIndicatorVariants,
    StepContent,
    StepLabel,
    StepDescription
}