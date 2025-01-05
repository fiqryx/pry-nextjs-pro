import { Metadata } from "next";
import { site } from "@/config/site";
import { notFound } from "next/navigation";
import { getInvoiceById } from "@/lib/fakers/invoice-faker";

import { PDFPreview } from "@/components/ui/document";
import { InvoiceDetailHydrator } from "../../components/invoice-detail-hydrator";
import { InvoiceDocumentPDF } from "../../components/invoice-document-pdf";


interface Params {
    params: Promise<{
        id: string
    }>
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { id } = await params
    const data = getInvoiceById(id)

    if (!data) {
        return {}
    }

    return {
        title: `Document preview - ${data.invoiceId} | ${site.name}`,
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
        <InvoiceDetailHydrator data={data}>
            <PDFPreview>
                <InvoiceDocumentPDF />
            </PDFPreview>
        </InvoiceDetailHydrator>
    )
}