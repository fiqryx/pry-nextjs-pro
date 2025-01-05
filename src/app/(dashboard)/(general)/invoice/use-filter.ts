import { atom, useAtom } from "jotai"

export type FilterAtom = {
    disabled: boolean
    order: string
    type: string
    pageIndex: number
    pageSize: number
    invoiceId?: string
    status?: string
    customer?: string
    from?: Date
    to?: Date
}

export const filterAtom = atom<FilterAtom>({
    disabled: true,
    order: 'desc',
    type: 'group',
    pageIndex: 0,
    pageSize: 5,
})

export function useFilter() {
    return useAtom(filterAtom)
}
