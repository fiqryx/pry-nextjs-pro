import Link from "next/link";
import { createMetadata } from "@/lib/metadata"

import { Plus } from "lucide-react"
import { Dashboard } from "@/components/app-dashboard"
import { buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table";
import { getOrders } from "@/lib/fakers/order-faker";
import { orderColumns } from "./components/order-columns";

export const revalidate = 0;
export const metadata = createMetadata({ title: 'Orders' })

export default function Page() {
    const orders = getOrders()

    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <div className="flex flex-wrap justify-between items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Orders
                </h1>
                <Link href="/order/create" className={buttonVariants()} >
                    <Plus /> Add
                </Link>
            </div>
            <DataTable
                pagination
                columnControl
                hideColumns={['orderNo']}
                filter={[
                    'orderNo',
                    'customer.name',
                    'paymentMethod.name',
                    'status'
                ]}
                data={orders}
                columns={orderColumns}
            />
        </Dashboard>
    )
}