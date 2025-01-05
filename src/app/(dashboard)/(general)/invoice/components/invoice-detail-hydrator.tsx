'use client'
import React from "react";
import { Invoice } from "@/types/invoice";
import { useHydrateAtoms } from 'jotai/utils'

import {
    invoiceAtom,
    useInvoice
} from "../use-invoices";


interface Props {
    data: Invoice
    children: React.ReactNode
}

export function InvoiceDetailHydrator({
    data,
    children
}: Props) {
    useHydrateAtoms([[invoiceAtom, data]])
    const [invoice, setInvoice] = useInvoice()

    React.useEffect(() => {
        if (data.id !== invoice?.id) {
            setInvoice(data)
        }
    }, [data])

    return children
}