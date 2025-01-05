'use client'
import React from "react"
import { Vehicle } from "@/types/vehicle"
import { useHydrateAtoms } from 'jotai/utils'
import { useVehicles, vehiclesAtom } from "../use-vehicles"


interface Props {
    data: Vehicle[]
    children: React.ReactNode
}

export function LogisticHydrator({
    data,
    children
}: Props) {
    useHydrateAtoms([[vehiclesAtom, data]])
    const [vehicles, setVehicles] = useVehicles()

    React.useEffect(() => {
        if (data?.length !== vehicles.length) {
            setVehicles(data)
        }
    }, [data])

    return children
}