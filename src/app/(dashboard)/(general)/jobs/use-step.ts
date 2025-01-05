import { atom, useAtom } from "jotai"

export const stepAtom = atom(0)

export function useStep() {
    return useAtom(stepAtom)
}