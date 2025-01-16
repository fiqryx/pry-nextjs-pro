import { createMetadata } from "@/lib/metadata"

import { Dashboard } from "@/components/app-dashboard";
import { I18nClient } from "./components/i81n-client";

export const metadata = createMetadata({ title: 'i18n' })

export default function Page() {
    return (
        <Dashboard className="container mx-auto lg:pt-12 gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Translation
                </h1>
                <span className="text-sm font-light italic text-muted-foreground">
                    Use the buttons in the header to change the language and see how the translations are updated.
                </span>
            </div>
            <I18nClient />
        </Dashboard>
    )
}