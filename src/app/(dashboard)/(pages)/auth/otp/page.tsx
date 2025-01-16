import { createMetadata } from "@/lib/metadata"

import { Separator } from "@/components/ui/separator";
import { BlockPreview } from "@/components/ui/block";
import { Dashboard } from "@/components/app-dashboard";
import { OtpFormSimple } from "./components/otp-form-simple";
import { OtpFormGroup } from "./components/otp-form-group";
import { OtpFormPattern } from "./components/otp-form-pattern";

export const metadata = createMetadata({ title: 'One-time password' })

export default async function Page() {
    return (
        <Dashboard className="container mx-auto lg:pt-12 gap-8">
            <div className="flex flex-col items-start gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    One-time password
                </h1>
                <span className="text-sm max-w-2xl font-light text-muted-foreground">
                    Check out some example pages to get started with our platform and explore all the possibilities.
                </span>
            </div>
            <BlockPreview label="A simple otp form.">
                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md">
                        <OtpFormSimple />
                    </div>
                </div>
            </BlockPreview>
            <Separator />
            <BlockPreview label="A otp page with group.">
                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md">
                        <OtpFormGroup />
                    </div>
                </div>
            </BlockPreview>
            <Separator />
            <BlockPreview label="A otp page with pattern.">
                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md">
                        <OtpFormPattern />
                    </div>
                </div>
            </BlockPreview>
        </Dashboard>
    )
}