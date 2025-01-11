import { cn } from "@/lib/utils";

export function HomeFeedback({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            {...props}
            className={cn(
                'relative flex flex-col items-center overflow-hidden border-x border-t px-6 py-8 md:py-16',
                className
            )}
        >
            <div
                className="absolute inset-x-0 bottom-0 z-[-1] h-24 opacity-30 duration-1000 animate-in fade-in"
                style={{
                    maskImage: 'linear-gradient(to bottom,transparent,white)',
                    backgroundImage:
                        'linear-gradient(to right, #eab308, transparent, #d946ef)',
                }}
            />
            <p className="text-center font-medium text-muted-foreground">
                Supercharge your productivity
            </p>

            <div className="mt-6 rounded-xl border bg-gradient-to-b from-secondary p-4 shadow-lg max-w-lg">
                <p className="text-sm text-center font-medium">
                    Our template is wonderfully simple and user-friendly. It's easy to love when you focus on essentials and skip non-critical extras.
                </p>
            </div>
        </div>
    );
}