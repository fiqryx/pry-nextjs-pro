import type { Metadata } from "next";
import { site } from "@/config/site";
import { getVehicles } from "@/lib/fakers/vehicle-faker";

import { Dashboard } from "@/components/app-dashboard";
import { LogisticHydrator } from "../components/logistic-hydrator";
import { LogisticFleetLayout } from "../components/logistic-fleet-layout";
import { LogisticFleetMaps } from "../components/logistic-fleet-maps";

export const metadata: Metadata = {
    title: "Fleet - Logistics | " + site.name,
    description: site.description,
}

export default function Page() {
    const data = getVehicles(4)

    return (
        <Dashboard className="p-0">
            <LogisticHydrator data={data}>
                <LogisticFleetLayout breakpoint={992}>
                    <LogisticFleetMaps className="w-full h-full" />
                </LogisticFleetLayout>
            </LogisticHydrator>
        </Dashboard>
    )
}