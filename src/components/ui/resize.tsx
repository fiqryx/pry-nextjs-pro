"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';

interface ResizeProps extends React.HTMLAttributes<HTMLDivElement> {
    size: number
    onEnter?: (state: boolean) => void
    onSizeChange: (size: number) => void
    cursor?: React.CSSProperties['cursor']
    direction?: 'horizontal' | 'vertical'
    handle?: boolean
}

const Resize = React.forwardRef<HTMLDivElement, ResizeProps>(
    ({
        className,
        size,
        onEnter,
        onSizeChange,
        cursor = 'ew-resize',
        direction = 'horizontal',
        handle,
        ...props
    }, ref) => {
        const handleMouseDown = (e: React.MouseEvent) => {
            document.body.style.userSelect = "none"
            if (onEnter) {
                onEnter(true)
            }

            const startPosition = direction === 'horizontal' ? e.clientX : e.clientY;
            const startSize = size;

            const handleMouseMove = (e: MouseEvent) => {
                const currentPosition = direction === 'horizontal' ? e.clientX : e.clientY;
                onSizeChange(startSize + (currentPosition - startPosition))
            };

            const handleMouseUp = () => {
                if (onEnter) {
                    onEnter(false)
                }
                document.body.style.userSelect = "auto";
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return (
            <div
                ref={ref}
                {...props}
                style={{ cursor }}
                onMouseDown={handleMouseDown}
                className={cn(
                    'hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex',
                    direction === 'horizontal' ? 'w-1 border-l -right-2.5' : 'h-1 border-t -bottom-2.5',
                    className
                )}
            >
                {handle && (
                    <div className='relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90'>
                        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
                            <DragHandleDots2Icon className="h-2.5 w-2.5" />
                        </div>
                    </div>
                )}
            </div>
        )
    }
)
Resize.displayName = "Resize"

export {
    Resize
}