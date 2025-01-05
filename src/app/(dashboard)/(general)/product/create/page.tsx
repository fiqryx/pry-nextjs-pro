import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/config/site";

import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Dashboard } from "@/components/app-dashboard"
import { ProductFormCreate } from "../components/product-form-create";

export const metadata: Metadata = {
    title: "Create product | " + site.name,
    description: site.description,
}

export default function Page() {
    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <div className="flex flex-col items-start gap-2">
                <Link
                    href="/product"
                    className={buttonVariants({ variant: 'link' })}
                >
                    <ArrowLeft /> Products
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">
                    Create product
                </h1>
            </div>
            <ProductFormCreate />
        </Dashboard>
    )
}