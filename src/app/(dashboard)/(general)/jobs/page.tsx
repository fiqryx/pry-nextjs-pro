import { createMetadata } from "@/lib/metadata"
import { getCompanies } from "@/lib/fakers/company-faker";

import { Dashboard } from "@/components/app-dashboard"
import { JobsHydrator } from "./components/jobs-hydrator";
import { JobsCarousel } from "./components/jobs-carousel";
import { JobsFilter } from "./components/jobs-filter";
import { JobsCompany } from "./components/jobs-company";

export const revalidate = 0;
export const metadata = createMetadata({ title: 'Jobs' })

export default function Page() {
    const data = getCompanies()

    return (
        <Dashboard className="container mx-auto lg:pt-12">
            <JobsHydrator data={data}>
                <JobsCarousel />
                <JobsFilter />
                <JobsCompany />
            </JobsHydrator>
        </Dashboard>
    )
}