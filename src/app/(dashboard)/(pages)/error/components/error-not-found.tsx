import Image from "next/image";

import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorNotFound({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div {...props} className={cn('flex flex-col h-full bg-background justify-center items-center p-6 gap-10', className)}>
            <div className="relative flex justify-center items-center w-full h-96">
                <Image
                    alt="error"
                    layout="fill"
                    objectFit="contain"
                    src="/assets/error-01-404.png"
                />
            </div>
            <div className="grid justify-center items-center gap-4">
                <h3 className="text-4xl font-semibold tracking-tight text-center">
                    404: This page could not be found
                </h3>
                <span className="text-center text-muted-foreground">
                    You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation
                </span>
            </div>
            <Button className="w-fit">
                <ArrowLeftIcon />
                Go back to home
            </Button>
        </div>
    )
}