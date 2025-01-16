import Link from "next/link";
import { createMetadata } from "@/lib/metadata"

import { Plus } from "lucide-react"
import { Dashboard } from "@/components/app-dashboard"
import { buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table";
import { customerColumns } from "./components/customer-columns";
import { getCustomers } from "@/lib/fakers/customer-faker";

export const metadata = createMetadata({ title: 'Customers' })

export default function Page() {
    const customers = getCustomers()

    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <div className="flex flex-wrap justify-between items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Customers
                </h1>
                <Link href="/customer/create" className={buttonVariants()} >
                    <Plus /> Add
                </Link>
            </div>
            <DataTable
                pagination
                columnControl
                filter={['name', 'email', 'phone']}
                hideColumns={['email']}
                data={customers}
                columns={customerColumns}
            />
        </Dashboard>
    )
}