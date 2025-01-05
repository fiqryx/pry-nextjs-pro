import Link from "next/link";
import { Metadata } from "next";
import { site } from "@/config/site";
import { notFound } from "next/navigation";

import { Dashboard } from "@/components/app-dashboard"
import { getOrderById } from "@/lib/fakers/order-faker";
import { OrderHydrator } from "../components/order-hydrator";

import { OrderDetailInfo } from "../components/order-detail-info";
import { OrderDetailSummary } from "../components/order-detail-summary";
import { OrderDetailTimeline } from "../components/order-detail-timeline";

import {
    ArrowLeft,
    ChevronDown
} from "lucide-react";
import {
    Button,
    buttonVariants
} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";


interface Params {
    params: Promise<{
        id: string
    }>
}

export const metadata: Metadata = {
    title: `Order detail | ${site.name}`,
    description: site.description,
}

export default async function Page({ params }: Params) {
    const { id } = await params
    const data = getOrderById(id)

    if (!data) {
        notFound()
    }

    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <OrderHydrator data={data}>
                <div className="flex flex-col items-start gap-2">
                    <Link
                        href="/order"
                        className={buttonVariants({ variant: 'link' })}
                    >
                        <ArrowLeft /> Orders
                    </Link>
                    <div className="flex flex-col sm:flex-row w-full justify-between gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {data.orderNo}
                        </h1>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Action
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid sm:grid-cols-5 gap-5">
                    <div className="sm:col-span-3 flex flex-col gap-5">
                        <OrderDetailInfo />
                        <OrderDetailSummary />
                    </div>
                    <OrderDetailTimeline className="order-first sm:order-last sm:col-span-2" />
                </div>
            </OrderHydrator>
        </Dashboard>
    )
}