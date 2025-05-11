import Link from "next/link";
import { Metadata } from "next";
import { site } from "@/config/site";
import { notFound } from "next/navigation";
import { getCustomerById } from "@/lib/fakers/customer-faker";

import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Dashboard } from "@/components/app-dashboard"

import { CustomerHydrator } from "../components/customer-hydrator";
import { CustomerDetailHeading } from "../components/customer-detail-heading";
import { CustomerDetailBasic } from "../components/customer-detail-basic";
import { CustomerDetailSecurity } from "../components/customer-detail-security";
import { CustomerDetailPayment } from "../components/customer-detail-payment";
import { CustomerDetailBilling } from "../components/customer-detail-billing";
import { CustomerDetailShipping } from "../components/customer-detail-shipping";
import { CustomerDetailNotification } from "../components/customer-detail-notification";

interface Params {
    params: Promise<{
        id: string
    }>
}

export const revalidate = 0;
export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { id } = await params
    const data = getCustomerById(id)

    if (!data) {
        return {}
    }

    return {
        title: `${data.name} - Customer | ${site.name}`,
        description: site.description
    }
}

export default async function Page({ params }: Params) {
    const { id } = await params
    const data = getCustomerById(id)

    if (!data) {
        notFound()
    }

    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <CustomerHydrator data={data}>
                <div className="flex flex-col items-start gap-2">
                    <Link
                        href="/customer"
                        className={buttonVariants({ variant: 'link' })}
                    >
                        <ArrowLeft /> Customers
                    </Link>
                    <CustomerDetailHeading />
                </div>
                <div className="grid xl:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-8">
                        <CustomerDetailBasic />
                        <CustomerDetailSecurity />
                    </div>
                    <div className="xl:col-span-2 flex flex-col gap-8">
                        <CustomerDetailPayment />
                        <CustomerDetailBilling />
                        <CustomerDetailShipping />
                        <CustomerDetailNotification />
                    </div>
                </div>
            </CustomerHydrator>
        </Dashboard>
    )
}