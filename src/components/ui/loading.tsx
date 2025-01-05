import React from "react"
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from "class-variance-authority"

const loadingVariants = cva(
    'loading',
    {
        variants: {
            variant: {
                dots: 'loading-dots',
                spinner: 'loading-spinner',
                ring: 'loading-ring',
                ball: 'loading-ball',
                bars: 'loading-bars',
                infinity: 'loading-infinity',
            },
            size: {
                sm: 'loading-sm',
                xs: 'loading-xs',
                md: 'loading-md',
                lg: 'loading-lg',
                xl: 'loading-xl',
                xxl: 'loading-2xl',
            }
        },
        defaultVariants: {
            variant: 'dots',
            size: 'md'
        }
    }
)

export interface LoadingProps extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
    ({ className, variant, size, children, ...props }, ref) => (
        <div
            ref={ref}
            {...props}
            className={cn(
                'flex flex-col min-h-screen justify-center items-center bg-background text-primary gap-2',
                className
            )}
        >
            <span className={cn(loadingVariants({ variant, size }))} />
            {children}
        </div>
    )
)
Loading.displayName = "Loading"


export {
    Loading
}