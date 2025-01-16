import Link from "next/link";
import { createMetadata } from "@/lib/metadata"

import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Dashboard } from "@/components/app-dashboard"
import { CustomerForm } from "../components/customer-form";

export const metadata = createMetadata({ title: 'Create customer' })

export default function Page() {
    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <div className="flex flex-col items-start gap-2">
                <Link
                    href="/customer"
                    className={buttonVariants({ variant: 'link' })}
                >
                    <ArrowLeft /> Customers
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">
                    Create customer
                </h1>
            </div>
            <CustomerForm />
        </Dashboard>
    )
}