import Link from "next/link";
import { Metadata } from "next";
import { site } from "@/config/site";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Dashboard } from "@/components/app-dashboard"
import { getProductById } from "@/lib/fakers/product-faker";
import { ProductHydrator } from "../components/product-hydrator";
import { ProductFormEdit } from "../components/product-form-edit";
import { ProductPreview } from "../components/product-preview";


interface Params {
    params: Promise<{
        id: string
    }>
}


export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { id } = await params
    const data = getProductById(id)

    if (!data) {
        return {}
    }

    return {
        title: `${data.name} - Product | ${site.name}`,
        description: site.description
    }
}


export default async function Page({ params }: Params) {
    const { id } = await params
    const data = getProductById(id)

    if (!data) {
        notFound()
    }

    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <ProductHydrator data={data}>
                <div className="flex flex-col items-start gap-2">
                    <Link
                        href="/product"
                        className={buttonVariants({ variant: 'link' })}
                    >
                        <ArrowLeft /> Products
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Edit product
                    </h1>
                </div>
                <div className="grid sm:grid-cols-5 gap-5">
                    <ProductFormEdit className="sm:col-span-3" />
                    <ProductPreview className="order-first sm:order-last sm:col-span-2" />
                </div>
            </ProductHydrator>
        </Dashboard>
    )
}