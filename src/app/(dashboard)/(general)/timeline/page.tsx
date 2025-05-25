import { createMetadata } from "@/lib/metadata"
import { Dashboard } from "@/components/app-dashboard";
import { getTasks } from "@/lib/fakers/task-faker";
import { TimelineCalendar } from "./components/timeline-calendar";

export const dynamic = 'force-dynamic';
export const metadata = createMetadata({ title: 'Timeline' });

export default async function Page() {
    const data = getTasks(20);

    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <div className="flex flex-wrap justify-between items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Timeline
                </h1>
            </div>
            <TimelineCalendar tasks={data} />
        </Dashboard>
    )
}