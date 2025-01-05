'use client'
import React from "react"
import { cn } from '@/lib/utils'
import {
    useDropzone,
    type DropzoneProps as _DropzoneProps,
    type DropzoneState as _DropzoneState,
} from 'react-dropzone'

type ChildrenFunction = (state: _DropzoneState) => React.JSX.Element

export interface DropzoneProps extends Omit<_DropzoneProps, 'children'> {
    containerClassName?: string
    className?: string
    children?: React.ReactNode | ChildrenFunction
}

const Dropzone = React.forwardRef<
    HTMLDivElement,
    DropzoneProps
>(({ containerClassName, className, disabled, children, ...props }, ref) => {
    const dropzone = useDropzone({
        ...props,
        disabled
    })

    return (
        <div ref={ref} className={cn('flex flex-col gap-2', containerClassName)}>
            <div
                {...dropzone.getRootProps()}
                className={cn(
                    'flex justify-center items-center w-full h-32 border border-dashed rounded-lg transition-all select-none',
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-muted/50 hover:text-accent-foreground',
                    className
                )}
            >
                <input {...dropzone.getInputProps()} />
                {typeof children === 'function' ? children(dropzone) : children}
            </div>
        </div>
    )
})
Dropzone.displayName = "Dropzone"


const DropzoneContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('p-6', className)}
        {...props}
    />
))
DropzoneContent.displayName = "DropzoneContent"

export {
    Dropzone,
    DropzoneContent
}