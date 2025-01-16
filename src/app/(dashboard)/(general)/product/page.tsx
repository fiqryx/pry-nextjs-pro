import Link from "next/link";
import { createMetadata } from "@/lib/metadata"
import { getProducts } from "@/lib/fakers/product-faker";

import { Plus } from "lucide-react"
import { Dashboard } from "@/components/app-dashboard"
import { buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table";
import { productColumns } from "./components/product-columns";

export const metadata = createMetadata({ title: 'Products' })

export default function Page() {
    const products = getProducts()

    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <div className="flex flex-wrap justify-between items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Products
                </h1>
                <Link href="/product/create" className={buttonVariants()} >
                    <Plus /> Add
                </Link>
            </div>
            <DataTable
                pagination
                columnControl
                filter={['name', 'sku', 'stock']}
                data={products}
                columns={productColumns}
            />
        </Dashboard>
    )
}