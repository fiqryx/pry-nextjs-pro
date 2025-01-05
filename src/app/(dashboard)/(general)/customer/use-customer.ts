import { atom, useAtom } from "jotai"
import { Customer } from "@/types/customer"

export const customerAtom = atom<Customer | null>(null)

export function useCustomer() {
    return useAtom(customerAtom)
}