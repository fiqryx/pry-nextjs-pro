import { createMetadata } from "@/lib/metadata"

import { Dashboard } from "@/components/app-dashboard"
import { SmartHomeWidgets } from "./components/smarthome-widgets";
import { SmartHomeWidgetDetails } from "./components/smarthome-widget-details";
import { SmartHomeDevices } from "./components/smarthome-devices";
import { SmartHomeMembers } from "./components/smarthome-members";
import { SmartHomePowerConsumed } from "./components/smarthome-power-consumed";

export const revalidate = 0;
export const metadata = createMetadata({ title: 'Smart home' })

export default function Page() {
    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <div className="grid xl:grid-cols-3 auto-rows-min gap-5 lg:gap-10">
                <div className="xl:col-span-2 flex flex-col gap-5">
                    <SmartHomeWidgets />
                    <SmartHomeWidgetDetails className="md:grid-cols-2" />
                </div>
                <div className="flex flex-col gap-5">
                    <SmartHomeDevices />
                    <SmartHomeMembers />
                    <SmartHomePowerConsumed />
                </div>
            </div>
        </Dashboard>
    )
}