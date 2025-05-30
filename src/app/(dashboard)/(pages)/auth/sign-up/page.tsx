import { createMetadata } from "@/lib/metadata"

import { GalleryVerticalEnd } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BlockPreview } from "@/components/ui/block";
import { Dashboard } from "@/components/app-dashboard";

import { SignUpFormSimple } from "./components/sign-up-form-simple";
import { SignUpFormSplit } from "./components/sign-up-form-split";
import { SignUpFormWithImage } from "./components/sign-up-form-with-image";

export const metadata = createMetadata({ title: 'Sign up' })

export default async function Page() {
    return (
        <Dashboard className="container mx-auto lg:pt-12 gap-8">
            <div className="flex flex-col items-start gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Sign up
                </h1>
                <span className="text-sm max-w-2xl font-light text-muted-foreground">
                    Check out some example pages to get started with our platform and explore all the possibilities.
                </span>
            </div>
            <BlockPreview label="A simple sign up form.">
                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md">
                        <SignUpFormSimple />
                    </div>
                </div>
            </BlockPreview>
            <Separator />
            <BlockPreview label="A two column sign up page with a cover image.">
                <div className="grid min-h-svh lg:grid-cols-2">
                    <div className="relative hidden bg-muted lg:block">
                        <img
                            src="/placeholder.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                    <div className="flex flex-col gap-4 p-6 md:p-10">
                        <div className="flex justify-center gap-2 md:justify-start">
                            <a href="#" className="flex items-center gap-2 font-medium">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                Acme Inc.
                            </a>
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                            <div className="w-full max-w-md">
                                <SignUpFormSplit />
                            </div>
                        </div>
                    </div>
                </div>
            </BlockPreview>
            <Separator />
            <BlockPreview label="A sign up page with form and image.">
                <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                    <div className="w-full max-w-md md:max-w-5xl">
                        <SignUpFormWithImage />
                    </div>
                </div>
            </BlockPreview>
        </Dashboard>
    )
}