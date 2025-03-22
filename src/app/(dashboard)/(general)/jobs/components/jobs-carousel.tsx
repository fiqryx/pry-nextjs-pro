'use client'
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

import Autoplay from "embla-carousel-autoplay"
import { buttonVariants } from "@/components/ui/button"

import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

export function JobsCarousel({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(1)

    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <div {...props} className={cn('flex', className)}>
            <Carousel
                setApi={setApi}
                className="w-full"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={() => count > 1 && plugin.current.play()}
            >
                <CarouselContent>
                    {Array.from({ length: count }).map((_, idx) => (
                        <CarouselItem key={idx} >
                            <div
                                className={cn('p-1', idx !== current && 'hidden sm:flex')}
                            >
                                <Card className="bg-linear-to-r from-primary to-primary/70">
                                    <CardContent className="grid sm:grid-cols-5 py-16 px-8">
                                        <div className="sm:col-span-3 flex flex-col gap-4">
                                            <h3 className="text-4xl text-primary-foreground font-semibold tracking-tight">
                                                Reach 50K+ potential candidates.
                                            </h3>
                                            <span className="text-lg tracking-tight">
                                                Post your job today for free. Promotions start at $99.
                                            </span>
                                            <Link
                                                href="/jobs/create"
                                                className={buttonVariants({
                                                    variant: 'outline',
                                                    className: 'mt-4 w-fit'
                                                })}
                                            >
                                                Post a job
                                            </Link>
                                        </div>
                                        <div className="hidden sm:col-span-2 sm:grid justify-center items-center">
                                            <Image src="/assets/iconly-glass-shield.svg" alt="shield" width={200} height={204} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {count > 1 && (
                    <div className="py-2 flex justify-center items-center gap-2">
                        {Array.from({ length: count }).map((_, idx) => (
                            <button
                                key={idx}
                                disabled={idx === current}
                                onClick={() => api?.scrollTo(idx, true)}
                                className={cn(
                                    'rounded-full p-1 transition-all',
                                    idx === current ? 'bg-primary' : 'bg-muted'
                                )}
                            />
                        ))}
                    </div>
                )}
            </Carousel>
        </div>
    )
}