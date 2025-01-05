import { atom, useAtom } from "jotai"
import {
    RouterIcon,
    Disc3Icon,
    LampIcon,
    TvMinimal,
} from "lucide-react"


const devicesAtom = atom([
    {
        id: 1,
        label: 'Tv',
        icon: TvMinimal,
        active: true,
    },
    {
        id: 2,
        label: 'Router',
        icon: RouterIcon,
        active: true,
    },
    {
        id: 3,
        label: 'Music system',
        icon: Disc3Icon,
        active: true,
    },
    {
        id: 4,
        label: 'Lamps',
        icon: LampIcon,
        active: true,
    },
])


export function useDevices() {
    return useAtom(devicesAtom)
}