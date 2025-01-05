import { atom, useAtom } from "jotai"

type Filter = {
    selected: string[]
    items: string[]
}

export const filterAtom = atom<Record<string, Filter>>({
    type: {
        selected: [],
        items: [
            'Freelance',
            'Full Time',
            'Part Time',
            'Internship'
        ]
    },
    level: {
        selected: [],
        items: [
            'Novice',
            'Expert'
        ]
    },
    location: {
        selected: [],
        items: [
            'Africa',
            'Asia',
            'Europe',
            'North America',
            'South America'
        ]
    },
    role: {
        selected: [],
        items: [
            'Frontend Developer',
            'Backend Developer',
            'iOS Developer',
        ]
    }
})

export function useFilter() {
    return useAtom(filterAtom)
}