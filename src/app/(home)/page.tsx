import { Metadata } from "next"
import { site } from "@/config/site"

export const metadata: Metadata = {
    title: site.name,
    description: site.description,
}

export default function Page() {
    return (
        <div>Home page</div>
    )
}