"use client";
import {LayoutDashboard, Package, ShoppingCart} from "lucide-react";
import DashButton from "@/components/ui/DashButton";
import {usePathname} from "next/navigation";
import {signOut} from "firebase/auth";
import {auth} from "@/lib/firebase/firebase";
import {clearUser, setLogin} from "@/features/userSlice";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";

export default function Layout({children}) {
    const pathname = usePathname();
    const dispatch = useDispatch()
    const router = useRouter();

    async function handleLogout() {
        try {
            await signOut(auth);
            dispatch(clearUser());
            console.log("User signed out successfully");
            dispatch(setLogin(false));
            router.push("/account/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return (

        <>
            <hr className={`border-0 h-[1px] bg-gray-200 -mt-5`}/>
            <div className={`flex flex-row pt-5`}>

                <div className={`flex flex-col gap-3 w-60 sticky top-0 h-screen pr-2 border-r-1 border-gray-200`}>
                    <DashButton active={pathname === "/admin/dashboard"}
                                icon={<LayoutDashboard className={`w-4.5 h-4.5`}></LayoutDashboard>} title={`Dashboard`}
                                link={`dashboard`}></DashButton>
                    <DashButton active={pathname === "/admin/products"}
                                icon={<Package className={`w-4.5 h-4.5`}></Package>}
                                title={`Products`} link={`products`}></DashButton>
                    <DashButton active={pathname === "/admin/orders"}
                                icon={<ShoppingCart className={`w-4.5 h-4.5`}></ShoppingCart>} title={`Orders`}
                                link={`orders`}></DashButton>
                    <button className="cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-md p-2"
                            onClick={handleLogout}>
                        Log Out
                    </button>

                </div>
                <div className={`flex-1`}>{children}</div>

            </div>
        </>

    )
}