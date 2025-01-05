import { cookies } from "next/headers"
import { site } from "@/config/site";
import type { Metadata } from "next";
import { Mail } from "./components/mail";
import { accounts, mails } from "./data";

import { Dashboard } from "@/components/app-dashboard";

export const metadata: Metadata = {
    title: "Mail | " + site.name,
    description: site.description,
};

export default async function Page() {
    const cookie = await cookies()
    const layout = cookie.get("react-resizable-panels:layout:mail")
    const collapsed = cookie.get("react-resizable-panels:collapsed")

    const defaultLayout = layout ? JSON.parse(layout.value) : undefined
    const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

    return (
        <Dashboard>
            <div className="flex-1 space-y-4 border rounded-lg">
                <Mail
                    accounts={accounts}
                    mails={mails}
                    defaultLayout={defaultLayout}
                    defaultCollapsed={defaultCollapsed}
                    navCollapsedSize={4}
                />
            </div>
        </Dashboard>
    )
}