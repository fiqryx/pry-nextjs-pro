import Link from "next/link";
import { createMetadata } from "@/lib/metadata"

import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Dashboard } from "@/components/app-dashboard"
import { InvoiceFormCreate } from "../components/invoice-form-create";

export const metadata = createMetadata({ title: 'Create invoice' })

export default function Page() {
    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <div className="flex flex-col items-start gap-2">
                <Link
                    href="/invoice"
                    className={buttonVariants({ variant: 'link' })}
                >
                    <ArrowLeft /> Invoices
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">
                    Create invoice
                </h1>
            </div>
            <InvoiceFormCreate />
        </Dashboard>
    )
}