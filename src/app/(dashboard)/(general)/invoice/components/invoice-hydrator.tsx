'use client'
import React from "react";
import { useHydrateAtoms } from 'jotai/utils'
import { InvoiceWithSummary } from "@/types/invoice";
import { getInvoiceSummary } from "@/lib/fakers/invoice-faker";

import {
    invoicesAtom,
    summaryAtom,
    useInvoices,
    useSummary
} from "../use-invoices";

interface Props {
    data: InvoiceWithSummary
    children: React.ReactNode
}

export function InvoicesHydator({
    data,
    children
}: Props) {
    useHydrateAtoms([
        [invoicesAtom, data.invoices],
        [summaryAtom, data.summary]
    ])

    const [invoices, setInvoices] = useInvoices()
    const [summary, setSummary] = useSummary()

    React.useEffect(() => {
        if (data.invoices.length !== invoices.length) {
            setInvoices(data.invoices)
        }

        if (data.summary !== summary) {
            setSummary(data.summary)
        }
    }, [data.invoices, data.summary])

    React.useEffect(() => {
        if (
            summary && invoices.length > 0 &&
            summary.count.all !== invoices.length
        ) {
            const updateSummary = getInvoiceSummary(invoices)
            setSummary(updateSummary)
        }
    }, [invoices])

    return children
}