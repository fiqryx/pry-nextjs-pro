import Link from "next/link";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Dashboard } from "@/components/app-dashboard"
import { buttonVariants } from "@/components/ui/button"
import { getInvoiceById } from "@/lib/fakers/invoice-faker";

import { PDFDownload } from "@/components/ui/document";
import { InvoiceDetail } from "../components/invoice-detail";
import { InvoiceDocumentPDF } from "../components/invoice-document-pdf";
import { InvoiceDetailHydrator } from "../components/invoice-detail-hydrator";

interface Params {
    params: Promise<{
        id: string
    }>
}

export const revalidate = 0;
export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { id } = await params
    const data = getInvoiceById(id)

    if (!data) {
        return {}
    }

    return {
        title: `${data.invoiceId} - Invoice | ${site.name}`,
        description: site.description
    }
}

export default async function Page({ params }: Params) {
    const { id } = await params
    const data = getInvoiceById(id)

    if (!data) {
        notFound()
    }

    return (
        <Dashboard className="container mx-auto space-y-4 sm:space-y-6 lg:pt-12">
            <InvoiceDetailHydrator data={data}>
                <div className="flex flex-col items-start gap-2">
                    <Link
                        href="/invoice"
                        className={buttonVariants({ variant: 'link' })}
                    >
                        <ArrowLeft /> Invoices
                    </Link>
                    <div className="flex flex-col sm:flex-row w-full justify-between gap-5">
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {data.invoiceId}
                            </h1>
                            <Badge
                                className="w-fit text-xs capitalize font-normal rounded-full h-6 py-1 px-2 gap-1"
                                variant={cn({
                                    'success': data.status === 'paid',
                                    'warning': data.status === 'pending',
                                    'destructive': data.status === 'canceled',
                                }) as 'default'}
                            >
                                {data.status}
                            </Badge>
                        </div>
                        <div className="flex sm:justify-end gap-2">
                            <PDFDownload
                                document={<InvoiceDocumentPDF />}
                                fileName={`${data.invoiceId}.pdf`}
                                className={buttonVariants({ variant: 'ghost' })}
                            >
                                Download
                            </PDFDownload>
                            <Link
                                target="_blank"
                                className={buttonVariants()}
                                href={`/invoice/${data.id}/pdf`}
                            >
                                Preview
                            </Link>
                        </div>
                    </div>
                </div>
                <InvoiceDetail />
            </InvoiceDetailHydrator>
        </Dashboard>
    )
}