import Link from "next/link";
import { Metadata } from "next";
import { site } from "@/config/site";
import { notFound } from "next/navigation";
import { getCompanyById } from "@/lib/fakers/company-faker";

import { ArrowLeft } from "lucide-react";
import { Dashboard } from "@/components/app-dashboard"
import { buttonVariants } from "@/components/ui/button"

import { CompanyHydrator } from "../components/company-hydrator";
import { CompanyDetail } from "../components/company-detail";
import { CompanySpecifications } from "../components/company-specifications";

interface Params {
    params: Promise<{
        id: string
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
        title: `${data.name} - Company | ${site.name}`,
        description: site.description
    }
}

export default async function Page({ params }: Params) {
    const { id } = await params
    const data = getCompanyById(id)

    if (!data) {
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
                    <CompanyDetail tab="/" className="lg:col-span-3" />
                    <CompanySpecifications className="lg:col-span-2" />
                </div>
            </CompanyHydrator>
        </Dashboard>
    )
}