import { site } from "./site"
import * as Lucide from "lucide-react"
import { Navigation } from "@/types/navigation"

export const navigation: Navigation = {
    teams: [
        {
            name: site.name,
            logo: Lucide.Pyramid,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: Lucide.AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Acme Inc",
            logo: Lucide.GalleryVerticalEnd,
            plan: "Startup",
        },
    ],
    main: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Lucide.Home,
        },
        {
            title: "Smart home",
            url: "/smart-home",
            icon: Lucide.HousePlug,
        },
    ],
    general: [
        {
            title: "Customers",
            url: "/customer",
            icon: Lucide.Users,
            items: [
                { title: "List customers", url: "/customer" },
                { title: "Create customer", url: "/customer/create" },
                { title: "Customer details", url: "/customer/1" },
            ],
        },
        {
            title: "Products",
            url: "/product",
            icon: Lucide.ShoppingBag,
            items: [
                { title: "List products", url: "/product" },
                { title: "Create product", url: "/product/create" },
                { title: "Product details", url: "/product/1" },
            ],
        },
        {
            title: "Orders",
            url: "/order",
            icon: Lucide.ShoppingCart,
            items: [
                { title: "List orders", url: "/order" },
                { title: "Create order", url: "/order/create" },
                { title: "Order details", url: "/order/1" },
            ],
        },
        {
            title: "Invoices",
            url: "/invoice",
            icon: Lucide.ReceiptText,
            items: [
                { title: "List invoices", url: "/invoice" },
                { title: "Create invoice", url: "/invoice/create" },
                { title: "Invoice details", url: "/invoice/1" },
            ],
        },
        {
            title: "Jobs",
            url: "/jobs",
            icon: Lucide.ClipboardList,
            items: [
                { title: "Browse Jobs", url: "/jobs" },
                { title: "Create Job", url: "/jobs/create" },
                { title: "Company details", url: "/company/1" },
            ],
        },
        {
            title: "Logistics",
            url: "/logistic",
            icon: Lucide.Truck,
            items: [
                { title: "Metrics", url: "/logistic" },
                { title: "Fleet", url: "/logistic/fleet" },
            ],
        },
        {
            title: "Mail",
            url: "/mail",
            icon: Lucide.Mail,
        },
    ],
    pages: [
        {
            title: "Auth",
            url: "#",
            icon: Lucide.Lock,
            isOpen: true,
            items: [
                { title: "Sign in", url: "/auth/sign-in" },
                { title: "Sign up", url: "/auth/sign-up" },
                { title: "One-time password", url: "/auth/otp" },
                { title: "Reset password", url: "/auth/reset-password" },
            ],
        },
        {
            title: "Error",
            url: "/error",
            icon: Lucide.FileX2,
        },
    ],
    misc: [
        {
            title: "i18n",
            url: "/i18n",
            icon: Lucide.Languages,
        },
        {
            title: 'Label',
            icon: Lucide.TagIcon,
            label: { variant: 'success', children: 'new' },
        },
        {
            title: "Level 0",
            url: "#",
            isOpen: true,
            icon: Lucide.CreditCard,
            items: [
                {
                    title: "Level 1",
                    isOpen: true,
                    items: [
                        {
                            title: "Level 2",
                            isOpen: true,
                            items: [
                                { title: "Level 3" },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            title: "Components",
            url: "https://ui.shadcn.com/docs/components",
            target: "_blank",
            icon: Lucide.Component,
        },
        {
            title: "Documentation",
            url: process.env.NEXT_PUBLIC_SITE_DOCS_URL ?? '#',
            target: process.env.NEXT_PUBLIC_SITE_DOCS_URL ? "_blank" : undefined,
            icon: Lucide.BookOpen,
        },
    ]
}