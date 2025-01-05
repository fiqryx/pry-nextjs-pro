import { atom, useAtom } from "jotai"
import { Product } from "@/types/product"

export const productAtom = atom<Product | null>(null)

export function useProduct() {
    return useAtom(productAtom)
}