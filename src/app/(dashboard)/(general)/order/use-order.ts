import { atom, useAtom } from "jotai"
import { Order } from "@/types/order"

export const orderAtom = atom<Order | null>(null)

export function useOrder() {
    return useAtom(orderAtom)
}