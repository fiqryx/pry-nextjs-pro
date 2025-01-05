"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
import { ImageIcon, LucideIcon } from "lucide-react"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square object-cover h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

interface AvatarWithFallbackProps extends
  React.ComponentPropsWithoutRef<typeof Avatar> {
  src?: string
  alt?: string
  fallback?: string | LucideIcon
  classNameWrapper?: string
}

const AvatarWithContent = React.forwardRef<HTMLDivElement, AvatarWithFallbackProps>(
  ({
    src,
    alt,
    fallback,
    className,
    classNameWrapper,
    children,
    ...props
  }, ref) => {
    const Comp = fallback

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-row flex-wrap items-center gap-2',
          classNameWrapper
        )}
      >
        <Avatar
          {...props}
          className={cn('size-12 text-sm rounded-full', className)}
        >
          <AvatarImage src={src} alt={alt} />
          {Comp ? (
            <AvatarFallback className="rounded-full">
              {typeof Comp === 'string' ? Comp : (
                <Comp className="text-muted-foreground" />
              )}
            </AvatarFallback>
          ) : <ImageIcon className="text-muted-foreground" />}
        </Avatar>
        {children}
      </div>
    )
  }
)
AvatarWithContent.displayName = "AvatarWithContent"

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarWithContent
}
