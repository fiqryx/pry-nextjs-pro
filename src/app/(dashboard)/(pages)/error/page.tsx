import { createMetadata } from "@/lib/metadata"

import { Separator } from "@/components/ui/separator";
import { BlockPreview } from "@/components/ui/block";
import { Dashboard } from "@/components/app-dashboard";

import { ErrorNotFound } from "./components/error-not-found";
import { ErrorInternalServer } from "./components/error-internal-server";
import { ErrorUnauthorized } from "./components/error-unauthorized";

export const metadata = createMetadata({ title: 'Error' })

export default function Page() {
    return (
        <Dashboard className="container mx-auto lg:pt-12 gap-8">
            <div className="flex flex-col items-start gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Error
                </h1>
                <span className="text-sm max-w-2xl font-light text-muted-foreground">
                    Check out some example pages to get started with our platform and explore all the possibilities.
                </span>
            </div>
            <BlockPreview label="A not found error page.">
                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full">
                        <ErrorNotFound />
                    </div>
                </div>
            </BlockPreview>
            <Separator />
            <BlockPreview label="A internal server error page.">
                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full">
                        <ErrorInternalServer />
                    </div>
                </div>
            </BlockPreview>
            <Separator />
            <BlockPreview label="A unauthorized error page.">
                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full">
                        <ErrorUnauthorized />
                    </div>
                </div>
            </BlockPreview>
        </Dashboard>
    )
}