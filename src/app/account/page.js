"use client";
import Link from "next/link";
import { User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import {clearUser, setLogin} from "@/features/userSlice";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const name = useSelector((state) => state.auth.name);
    const dispatch = useDispatch();
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
        <div className="grid grid-cols-2 mx-16 min-h-70 font-sf">
            <div className="flex flex-col gap-3">
                <h2 className="text-[40px] font-bold">Account</h2>
                <div className="flex flex-row gap-2 text-[16px]">
                    <Link
                        href="/account/wishlist"
                        className="flex flex-row gap-1 items-center"
                    >
                        <h3>MY WISHLIST</h3>
                        <User className="w-5 h-5" />
                    </Link>

                    <button onClick={handleLogout} className={`cursor-pointer`}>LOG OUT</button>
                </div>
                <div>
                    <h2 className="text-[24px] font-bold">Order History</h2>
                    <h4 className="text-[16px]">You haven&#39;t placed any orders yet.</h4>
                </div>
            </div>
            <div className="flex flex-col gap-3 justify-self-end self-center">
                <h2 className="text-[24px] font-bold">Account Details</h2>
                <h3 className="text-[16px]">{name.firstname} {name.lastname}</h3>
            </div>
        </div>
    );
}
