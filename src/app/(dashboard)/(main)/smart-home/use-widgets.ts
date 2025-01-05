import { atom, useAtom } from "jotai"
import {
    Zap,
    AirVent,
    Lightbulb,
    Refrigerator,
} from "lucide-react"

const widgetsAtom = atom([
    {
        id: 1,
        label: 'Refridgerator',
        icon: Refrigerator,
        active: false,
        unit: '°C',
        value: 10.5,
        min: 0,
        max: 30
    },
    {
        id: 2,
        label: 'Temperature',
        icon: Zap,
        active: true,
        unit: '°C',
        value: 15,
        min: 0,
        max: 30
    },
    {
        id: 3,
        label: 'Air conditioner',
        icon: AirVent,
        active: false,
        unit: '°C',
        value: 22.4,
        min: 0,
        max: 30
    },
    {
        id: 4,
        label: 'Lights',
        icon: Lightbulb,
        active: false,
        unit: '%',
        value: 75,
        min: 0,
        max: 100
    },
])

export function useWidgets() {
    return useAtom(widgetsAtom)
}