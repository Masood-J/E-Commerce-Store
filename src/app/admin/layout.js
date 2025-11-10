"use client";
import {LayoutDashboard, Package, ShoppingCart} from "lucide-react";
import DashButton from "@/components/ui/DashButton";
import {usePathname} from "next/navigation";

export default function Layout({children}) {
    const pathname = usePathname();

    return (


        <div className={`flex flex-row `}>
            <div className={`flex flex-col gap-3 w-60`}>
                <DashButton active={pathname==="/admin/dashboard"} icon={<LayoutDashboard className={`w-4.5 h-4.5`}></LayoutDashboard>} title={`Dashboard`}
                            link={`dashboard`}></DashButton>
                <DashButton active={pathname === "/admin/products"} icon={<Package className={`w-4.5 h-4.5`}></Package>}
                            title={`Products`} link={`products`}></DashButton>
                <DashButton active={pathname === "/admin/orders"}
                            icon={<ShoppingCart className={`w-4.5 h-4.5`}></ShoppingCart>} title={`Orders`}
                            link={`orders`}></DashButton>

            </div>
            <div className={`flex-1`}>{children}</div>

        </div>


    )
}