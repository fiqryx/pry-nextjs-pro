import Link from "next/link";
import { createMetadata } from "@/lib/metadata"

import { Plus } from "lucide-react"
import { Dashboard } from "@/components/app-dashboard"
import { buttonVariants } from "@/components/ui/button"
import { getInvoices } from "@/lib/fakers/invoice-faker";

import { InvoiceWidget } from "./components/invoice-widget";
import { InvoicesHydator } from "./components/invoice-hydrator";
import { InvoiceView } from "./components/invoice-view";
import { InvoiceFilter } from "./components/invoice-filter";
import { InvoiceTable } from "./components/invoice-table";

export const revalidate = 0;
export const metadata = createMetadata({ title: 'Invoices' })

export default function Page() {
    const data = getInvoices()

    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <InvoicesHydator data={data}>
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Invoices
                    </h1>
                    <Link href="/invoice/create" className={buttonVariants()} >
                        <Plus /> New
                    </Link>
                </div>
                <div className="grid gap-5">
                    <InvoiceWidget />
                    <InvoiceView />
                    <div className="grid sm:grid-cols-4 gap-5">
                        <InvoiceFilter className="h-fit" />
                        <InvoiceTable className="sm:col-span-3" />
                    </div>
                </div>
            </InvoicesHydator>
        </Dashboard>
    )
}