import { atom, useAtom } from "jotai"
import { Vehicle } from "@/types/vehicle"
import { getVehicleById } from "@/lib/fakers/vehicle-faker"

const vehicle = getVehicleById("1") as Vehicle

export const vehiclesAtom = atom<Vehicle[]>([])

export const vehicleAtom = atom<Vehicle | undefined>(vehicle)

export function useVehicles() {
    return useAtom(vehiclesAtom)
}

export function useVehicle() {
    return useAtom(vehicleAtom)
}