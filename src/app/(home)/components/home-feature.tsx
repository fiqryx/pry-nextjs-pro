
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { CodeBlock } from "@/components/ui/code-block";
import { buttonVariants } from "@/components/ui/button";

import QualityImage from '@/../public/thumbnail/order-table-light.png';
import ThemeFeature from '@/../public/thumbnail/theme-feature.svg';

import {
    LucideIcon,
    SearchIcon,
    CodeXmlIcon,
    PaletteIcon,
    TimerIcon,
    CpuIcon,
    LayoutIcon,
    LibraryIcon,
    BookIcon,
    BookOpenIcon,
} from "lucide-react";

const code = `import { useTheme } from "next-themes"

export function Component() {
    const { theme, setTheme } = useTheme()

    const toggle = () => {
        const value = theme === 'dark' ? 'light' : 'dark'
        setTheme(value)
    }

    return (
        <button onClick={toggle}>{theme}</button>
    )
}`;


export function HomeFeature({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div {...props} className={cn('grid grid-cols-1 md:grid-cols-2', className)}>
            <Feature
                icon={CodeXmlIcon}
                subheading="Quality"
                heading="Built by Shadcn UI"
                description="Creates interactive components, offering a rich experience to your users."
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 60% 50%,hsl(var(--secondary)),hsl(var(--background)) 80%)',
                }}
            >
                <div className="relative mt-8 h-[300px] overflow-hidden">
                    <Image
                        priority
                        alt="preview"
                        src={QualityImage}
                        className="rounded-lg border border-input mb-[-180px] min-w-[800px] md:min-w-[1100px] shadow-lg"
                    />
                </div>
            </Feature>
            <Feature
                icon={CpuIcon}
                subheading="Robust"
                heading="Flexibility that cover your needs."
                description="Well documented, separated in packages."
            >
                <div className="mt-8 flex flex-col gap-4">
                    <Link
                        href={process.env.NEXT_PUBLIC_SITE_DOCS_URL ?? '#'}
                        className="rounded-xl bg-gradient-to-br from-transparent via-primary p-px shadow-lg shadow-primary/20"
                    >
                        <div className="rounded-[inherit] bg-background bg-gradient-to-br from-transparent via-primary/10 p-4 transition-colors hover:bg-muted">
                            <BookOpenIcon />
                            <h3 className="font-semibold">Docs UI</h3>
                            <p className="text-sm text-muted-foreground">
                                Default of docs with many useful components.
                            </p>
                        </div>
                    </Link>
                </div>
            </Feature>
            <Feature
                icon={PaletteIcon}
                subheading="Themeable"
                heading="Easy to customize"
                description="Tweak the theme in your editor for global style changes."
            >
                <div className="relative mt-8 h-[324px] overflow-hidden">
                    <Image
                        priority
                        alt="preview"
                        src={ThemeFeature}
                        className="invert-0 dark:invert"
                    />
                </div>
            </Feature>
            <Feature
                icon={TimerIcon}
                subheading="Save time"
                heading="Built with the latest tech"
                description="Every template provides a thoughtfully structured project, offering a codebase that's not only productive but also a joy to work with."
            >
                <div className="relative mt-8 h-[300px] overflow-hidden">
                    <div className="border rounded-xl border-input p-1.5 mb-[-180px] min-w-[720px] bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 shadow-lg shadow-stone-800/50">
                        <CodeBlock
                            code={code}
                            options={{
                                lang: 'tsx'
                            }} />
                    </div>
                </div>
            </Feature>
        </div>
    );
}


function Feature({
    className,
    icon: Icon,
    heading,
    subheading,
    description,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & {
    icon: LucideIcon;
    subheading: React.ReactNode;
    heading: React.ReactNode;
    description: React.ReactNode;
}): React.ReactElement {
    return (
        <div
            {...props}
            className={cn('border-l border-t *:px-6 pt-12', className)}
        >
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Icon className="size-4" />
                <p>{subheading}</p>
            </div>
            <h2 className="mb-2 text-lg font-semibold">{heading}</h2>
            <p className="text-muted-foreground">{description}</p>

            {props.children}
        </div>
    );
}