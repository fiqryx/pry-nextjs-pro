import { Company } from "@/types/company"
import { atom, useAtom } from "jotai"

export const companyAtom = atom<Company>()

export function useCompany() {
    return useAtom(companyAtom)
}