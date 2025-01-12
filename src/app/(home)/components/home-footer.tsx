import React from "react";
import { cn } from "@/lib/utils";

export function Footer({
    className,
    ...props
}: React.ComponentProps<'footer'>) {
    return (
        <footer {...props} className={cn('mt-auto border-t bg-card p-4', className)}>
            <div className="container mx-auto flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="mb-1 text-sm font-semibold">Pry</p>
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()}. All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}