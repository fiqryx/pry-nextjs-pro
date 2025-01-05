import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/config/site";

import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Dashboard } from "@/components/app-dashboard"
import { CustomerForm } from "../components/customer-form";

export const metadata: Metadata = {
    title: "Create customer | " + site.name,
    description: site.description,
}

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