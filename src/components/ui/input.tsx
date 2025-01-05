import React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const renderIcon = (children: React.ReactNode) => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const displayName = (child.type as React.ComponentType)?.displayName;

      if (displayName === 'InputIcon') {
        return {
          child,
          props: child.props as React.ComponentProps<typeof InputIcon>
        }
      }
    }
  })?.[0]
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, children, ...props }, ref) => {
    const icon = renderIcon(children)

    if (icon) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center gap-2 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:ring-ring',
            className
          )}
        >
          {icon.props.position === 'left' && icon.child}
          <input
            {...props}
            className="w-full bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          {icon.props.position === 'right' && icon.child}
        </div>
      )
    }

    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:ring-ring file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      />
    )
  }
)
Input.displayName = "Input"


type IconProps = {
  children: React.ReactNode
  position: 'left' | 'right'
}

const InputIcon = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"span"> & IconProps
>(
  ({ children, className, ...props }, ref) => {
    if (typeof children === "string") {
      return (
        <span
          {...props}
          ref={ref}
          className={cn('text-muted-foreground', className)}
        >
          {children}
        </span>
      )
    }

    if (React.isValidElement(children)) {
      return (
        <span
          {...props}
          ref={ref}
          className={cn('text-muted-foreground', className)}
        >
          {children}
        </span>
      )
    }

    console.error("Invalid type for `children` prop in Icon:", children);
    return null;
  }
)
InputIcon.displayName = "InputIcon"

export {
  Input,
  InputIcon
}
