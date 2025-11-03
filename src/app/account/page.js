"use client";
import Link from "next/link";
import {User} from "lucide-react";
import {useSelector, useDispatch} from "react-redux";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "@/lib/firebase/firebase";
import {clearUser, setLogin} from "@/features/userSlice";
import {setCart} from "@/features/cartSlice";
import {useRouter} from "next/navigation";
import {db} from "@/lib/firebase/firebase";
import {doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";

export default function AccountPage() {
    const name = useSelector((state) => state.auth.name);
    const userId = useSelector((state) => state.auth.userId);
    const dispatch = useDispatch();
    const router = useRouter();
    const [pastOrders, setPastOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        async function FetchOrderHistory() {
            if (!user || !user.uid) {
                console.log("User not loaded yet, skipping fetch...");
                return;
            }
            setLoading(true);
            try {
                const orderRef = doc(db, "users", user.uid);
                const snapshot = await getDoc(orderRef);

                if (snapshot.exists()) {
                    const userData = snapshot.data();
                    setPastOrders(userData.orders || []);
                    setShowOrder(true)
                } else {
                    setPastOrders([]);
                    setShowOrder(true);
                }
            } catch (error) {
                console.error("Error fetching order history:", error);
            } finally {
                setLoading(false);
            }
        }

        FetchOrderHistory();
    }, [user]);

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
        <div className={`grid grid-cols-[2fr_1fr] mx-16 min-h-70 font-sf`}>
            <div className="flex flex-col gap-3 col-start-1 col-span-3">
                <h2 className="text-[40px] font-bold">Account</h2>
                <div className="flex flex-row gap-2 text-[16px]">
                    <Link
                        href="/account/wishlist"
                        className="flex flex-row gap-1 items-center"
                    >
                        <h3>MY WISHLIST</h3>
                        <User className="w-5 h-5"/>
                    </Link>

                    <button onClick={handleLogout} className={`cursor-pointer`}>LOG OUT</button>
                </div>
                <div>
                    <h2 className="text-[24px] font-bold">Order History</h2>
                    {loading && (<div>
                        <h4 className="text-[16px] text-blue-500">Fetching Order History..</h4>
                    </div>)}
                    {(pastOrders.length === 0 && showOrder === true) && (
                        <h4 className="text-[16px]">
                            You haven&apos;t placed any orders yet.
                        </h4>
                    )}
                    <div className="grid grid-cols-4 text-sm font-semibold border-b pb-2">
                        <h3>ORDER</h3>
                        <h3>DATE</h3>
                        <h3>PAYMENT</h3>
                        <h3>TOTAL</h3>
                    </div>
                    <div className="divide-y">
                        {pastOrders.map((order) => (
                            <div
                                key={order.orderId}
                                className="grid grid-cols-4 items-center py-3 text-[15px]"
                            >
                                <p>{order.orderId}</p>
                                <p>{order.orderDate}</p>
                                <p>
                                    {order.paymentMethod === "cod"
                                        ? "Cash on Delivery"
                                        : order.paymentMethod === "card"
                                            ? "Card Payment"
                                            : "Unknown"}
                                </p>
                                <p>${order.total}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div className="flex flex-col col-start-4 gap-3 justify-self-end self-center">
                <h2 className="text-[24px] font-bold">Account Details</h2>
                <h3 className="text-[16px]">{name.firstname} {name.lastname}</h3>
            </div>
        </div>
    );
}
