import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCompanyById } from "@/lib/fakers/company-faker";

import { ArrowLeft } from "lucide-react";
import { Dashboard } from "@/components/app-dashboard"
import { buttonVariants } from "@/components/ui/button"

import { CompanyHydrator } from "../../components/company-hydrator";
import { CompanyDetail } from "../../components/company-detail";
import { CompanySpecifications } from "../../components/company-specifications";

const tabs = ['/', '/reviews', '/activity', '/team', '/assets'] as const

interface Params {
    params: Promise<{
        id: string
        tab: string
    }>
}

export const revalidate = 0;
export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { id } = await params
    const data = getCompanyById(id)

    if (!data) {
        return {}
    }

    return {
        title: `${data.name} - Company | ${process.env.APP_NAME}`,
        description: ''
    }
}

export default async function Page({ params }: Params) {
    const pathname = await params;
    const data = getCompanyById(pathname.id);
    const tab = `/${pathname.tab}` as typeof tabs[number];

    if (!data || !tabs.includes(tab)) {
        notFound()
    }

    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <CompanyHydrator data={data}>
                <div className="flex flex-col items-start gap-2">
                    <Link
                        href="/jobs"
                        className={buttonVariants({ variant: 'link' })}
                    >
                        <ArrowLeft /> Jobs
                    </Link>
                </div>
                <div className="grid lg:grid-cols-5 gap-5">
                    <CompanyDetail tab={tab} className="lg:col-span-3" />
                    <CompanySpecifications className="lg:col-span-2" />
                </div>
            </CompanyHydrator>
        </Dashboard>
    )
}