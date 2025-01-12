import React from "react"
import { cn } from "@/lib/utils"
import type { CodeToHastOptions } from 'shiki/core'
import { highlightCode } from "@/lib/highlight-code"

import {
    BundledTheme,
    BundledLanguage,
} from "shiki"

export interface CodeBlockProps extends
    React.HtmlHTMLAttributes<HTMLDivElement> {
    code: string
    options?: Partial<CodeToHastOptions<BundledLanguage, BundledTheme>>
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
    async ({ code, options, className, ...props }, ref) => (
        <div
            ref={ref}
            {...props}
            data-rehype-pretty-code-fragment
            dangerouslySetInnerHTML={{ __html: await highlightCode(code, options) }}
            className={cn(
                'w-full overflow-hidden rounded-md [&_pre]:my-0 [&_pre]:h-[--container-height] [&_pre]:overflow-auto [&_pre]:whitespace-break-spaces [&_pre]:p-6 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed',
                className
            )}
        />
    )
)
CodeBlock.displayName = "CodeBlock"

export {
    CodeBlock
}