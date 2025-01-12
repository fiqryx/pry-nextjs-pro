import Image from "next/image";
import { cn } from "@/lib/utils";

import ImageSource from '@/../public/thumbnail/order-light.png';

export function HomeStartBuild({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            {...props}
            className={cn(
                'grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3',
                className
            )}
            style={{
                background: [
                    "url('cosmic.svg') center/cover no-repeat",
                    'linear-gradient(to bottom, hsl(var(--background)) 40%, transparent)',
                    'repeating-linear-gradient(to right, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px)',
                    'repeating-linear-gradient(to bottom, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px)'
                ].join(',')
            }}
        >
            <div className="relative flex flex-col gap-4 overflow-hidden px-8 pt-14">
                <h2 className="text-3xl font-semibold">Start building today.</h2>
                <span className="text-sm text-muted-foreground">
                    Focus on building your app, not on integrating APIs. The kit provides the essential code you need to launch quickly.
                </span>
            </div>
            <div className="relative col-span-2 *:p-6">
                <div className="h-[400px] overflow-hidden">
                    <div
                        className={cn(
                            'select-none animate-in fade-in slide-in-from-right-12 duration-1000',
                            'border rounded-xl border-input p-2 mb-[-180px] mt-8 min-w-[800px] md:min-w-[1100px]',
                            'bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 shadow-lg shadow-stone-800/50'
                        )}
                    >
                        <Image
                            priority
                            alt="preview"
                            src={ImageSource}
                            className="rounded-lg border border-input/10"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}