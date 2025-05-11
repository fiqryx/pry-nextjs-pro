import { createMetadata } from "@/lib/metadata"
import { getVehicles } from "@/lib/fakers/vehicle-faker";


import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dashboard } from "@/components/app-dashboard"

import { LogisticWidgets } from "./components/logistic-widgets";
import { LogisticVehicleDelivery } from "./components/logistic-vehicle-delivery";
import { LogisticVehicleCondition } from "./components/logistic-vehicle-condition";
import { LogisticVehicleRoute } from "./components/logistic-vehicle-route";
import { LogisticHydrator } from "./components/logistic-hydrator";

export const revalidate = 0;
export const metadata = createMetadata({ title: 'Logistics' })

export default function Page() {
    const data = getVehicles(4)

    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <LogisticHydrator data={data}>
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Logistics
                    </h1>
                    <Button type="button">
                        <Plus /> Add vehicle
                    </Button>
                </div>
                <div className="grid mt-4 gap-5">
                    <LogisticWidgets />
                    <div className="grid lg:grid-cols-2 gap-5">
                        <LogisticVehicleDelivery />
                        <LogisticVehicleCondition />
                    </div>
                    <LogisticVehicleRoute />
                </div>
            </LogisticHydrator>
        </Dashboard>
    )
}