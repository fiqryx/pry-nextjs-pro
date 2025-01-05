import { Jobs } from "@/types/jobs"
import { atom, useAtom } from "jotai"

export const jobAtom = atom<Jobs>()

export function useJob() {
    return useAtom(jobAtom)
}