import { atom, useAtom } from "jotai"
import {
    Invoice,
    InvoiceSummary
} from "@/types/invoice"

export const invoicesAtom = atom<Invoice[]>([])

export function useInvoices() {
    return useAtom(invoicesAtom)
}

export const invoiceAtom = atom<Invoice | null>(null)

export function useInvoice() {
    return useAtom(invoiceAtom)
}

export const summaryAtom = atom<InvoiceSummary | null>(null)

export function useSummary() {
    return useAtom(summaryAtom)
}