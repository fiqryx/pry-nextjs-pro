import Link from "next/link"
import Image from "next/image"
import { site } from "@/config/site"
import { createMetadata } from "@/lib/metadata"

import { PowerBy } from "../power-by"
import { Icons } from "@/components/icons"
import { SingUpForm } from "./components/sign-up-form"

export const metadata = createMetadata({ title: 'Sign up' })

export default function Page() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="relative hidden lg:flex flex-1 justify-center items-center p-4">
                <div
                    className="absolute inset-0 z-[-1]"
                    style={{
                        backgroundImage: [
                            'radial-gradient(ellipse at top, transparent 60%, hsla(250,90%,90%,0.2))',
                            'linear-gradient(to bottom, hsl(var(--background)) 40%, transparent)',
                            'repeating-linear-gradient(to right, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px)',
                            'repeating-linear-gradient(to bottom, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px)',
                        ].join(', '),
                    }}
                />
                <div className="relative w-[500px] h-[600px]">
                    <Image fill alt="cover" src="/assets/cover-03.jpg" className="object-cover rounded-xl animate-fade delay-100 scale-x-[-1]" />
                    <div className="absolute -top-5 -left-10 animate-fade-down delay-500">
                        <div className="flex flex-col w-60 items-center text-center bg-background/80 shadow-lg rounded-lg border p-2">
                            <h3 className="text-xs font-semibold tracking-tight leading-snug">
                                Save Time and Simply Build Better
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground line-clamp-3">
                                Transformation With Our Powerful Template Designed To Your Application.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <Icons.logo className="size-6 bg-foreground text-background p-1 rounded-sm" />
                        {site.name}
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="mx-auto grid gap-4">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">
                                Sign up
                            </h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your email below to sign up to your account
                            </p>
                        </div>
                        <SingUpForm />
                        <div className="text-center text-sm">
                            Already have account?{" "}
                            <Link href="/sign-in" className="underline">
                                Sign in
                            </Link>
                        </div>
                        <PowerBy />
                    </div>
                </div>
            </div>
        </div>
    )
}
