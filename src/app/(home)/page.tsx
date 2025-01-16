import { createMetadata } from "@/lib/metadata"

import { Terminal } from "lucide-react";
import { Navbar } from "./components/home-navbar";
import { HomeHero } from "./components/home-hero";
import { HomeFeedback } from "./components/home-feedback";
import { Footer } from "./components/home-footer";
import { HomeStartBuild } from "./components/home-start-build";
import { HomeFeature } from "./components/home-feature";

export const metadata = createMetadata({})

export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <Navbar className="top-0 lg:top-2" />
            <div
                className="absolute inset-x-0 top-[200px] h-[250px] max-md:hidden"
                style={{
                    background: [
                        "url('cosmic.svg') center/cover no-repeat",
                        'repeating-linear-gradient(to right, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px)',
                        'repeating-linear-gradient(to bottom, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px)'
                    ].join(',')
                }}
            />
            <main className="container relative max-w-[1100px] px-2 mt-16 lg:mt-24">
                <div
                    style={{
                        background:
                            'repeating-linear-gradient(to bottom, transparent, hsl(var(--secondary)/.2) 500px, transparent 1000px)',
                    }}
                >
                    <HomeHero className="relative" />
                    <HomeFeedback />
                    <div className="container flex flex-col items-center border-x border-y py-16 md:py-24">
                        <Terminal className="mb-2 size-8 text-background bg-foreground rounded-md p-1" />
                        <h2 className="text-center text-2xl font-semibold sm:text-3xl">
                            Start instantly.
                            <br />
                            Make it yours, Site within seconds.
                        </h2>
                    </div>
                    <HomeFeature className="border-r" />
                    <HomeStartBuild className="border-y border-x" />
                </div>
            </main>
            <Footer className="w-full mt-2" />
        </div>
    )
}
