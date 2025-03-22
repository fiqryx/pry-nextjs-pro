import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import Thumbnail from '@/../thumbnail.png';
import { buttonVariants } from "@/components/ui/button";

export function HomeHero({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            {...props}
            className={cn(
                'container relative z-2 flex flex-col overflow-hidden border-x border-t bg-background px-6 pt-12 max-md:text-center md:px-12 md:pt-16',
                className
            )}
        >
            <h1 className="mb-8 text-4xl font-medium md:hidden">Build Your Site</h1>
            <h1 className="mb-8 max-w-[400px] text-4xl font-medium max-md:hidden">
                Build excellent site with less effort
            </h1>
            <p className="mb-8 text-muted-foreground md:max-w-[80%] md:text-xl">
                Pry is a{' '}
                <span className="text-foreground">beautiful & robust</span>{' '}
                UI Kit with a complete toolchain. Designed for{' '}
                <span className="text-foreground">Productivity</span>,{' '}
                <span className="text-foreground">Flexibility</span> and{' '}
                <span className="text-foreground">Next.js</span>.
            </p>
            <div className="inline-flex items-center gap-3 max-md:mx-auto">
                <Link
                    href="/dashboard"
                    className={cn(
                        buttonVariants({ size: 'lg', className: 'rounded-full' }),
                    )}
                >
                    Dashboard
                </Link>
                <Link
                    href={process.env.NEXT_PUBLIC_SITE_DOCS_URL ?? '#'}
                    className={cn(
                        buttonVariants({
                            size: 'lg',
                            variant: 'outline',
                            className: 'rounded-full bg-background',
                        }),
                    )}
                >
                    Documentation
                </Link>
            </div>
            <div
                className={cn(
                    'select-none animate-in fade-in slide-in-from-bottom-12 duration-1000',
                    'border rounded-xl border-input p-2 mb-[-180px] mt-8 min-w-[800px] md:min-w-[1100px]',
                    'bg-linear-to-br from-stone-900 via-stone-800 to-stone-950 shadow-lg shadow-stone-800/50'
                )}
            >
                <Image
                    priority
                    alt="preview"
                    src={Thumbnail}
                    className="rounded-lg border border-input/10"
                />
            </div>
            <div
                className="absolute inset-0 z-[-1]"
                style={{
                    backgroundImage: [
                        'radial-gradient(ellipse at top, transparent 60%, hsla(250,90%,90%,0.2))',
                        'linear-gradient(to bottom, transparent 30%, hsl(var(--primary) / 0.2))',
                        'linear-gradient(to bottom, hsl(var(--background)) 40%, transparent)',
                        'repeating-linear-gradient(45deg, transparent,transparent 60px, hsl(var(--primary)) 61px, transparent 62px)',
                    ].join(', '),
                }}
            />
        </div>
    );
}