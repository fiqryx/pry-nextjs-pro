import { createMetadata } from "@/lib/metadata"
import { Dashboard } from "@/components/app-dashboard"
import { JobsFormCreate } from "../components/jobs-form-create";

export const metadata = createMetadata({ title: 'Create jobs' })

export default function Page() {
    return (
        <Dashboard className="container h-full p-1">
            <div className="flex h-full">
                <div className="basis-2/5 hidden sm:block bg-gradient-to-r from-primary to-primary/70 rounded-bl-xl" />
                <JobsFormCreate />
            </div>
        </Dashboard>
    )
}