import { createMetadata } from "@/lib/metadata"

import { Dashboard } from "@/components/app-dashboard"
import { DashboardWidgets } from "./components/dashboard-widgets";
import { DashboardSales } from "./components/dahsboard-sales";
import { DashboardTraffic } from "./components/dashboard-traffic";
import { DashboardProducts } from "./components/dashboard-products";
import { DashboardOrders } from "./components/dashboard-orders";
import { getProducts } from "@/lib/fakers/product-faker";

export const revalidate = 0;
export const metadata = createMetadata({ title: 'Dashboard' })

export default function Page() {
  const products = getProducts(5)

  return (
    <Dashboard className="container mx-auto lg:pt-12">
      <DashboardWidgets className="md:grid-cols-2 lg:grid-cols-4 gap-5" />
      <div className="grid lg:grid-cols-3 auto-rows-min gap-5">
        <DashboardSales className="lg:col-span-2" />
        <DashboardTraffic />
        <DashboardProducts products={products} />
        <DashboardOrders className="lg:col-span-2" />
      </div>
    </Dashboard>
  )
}
