"use client";
import CheckoutForm from "@/components/ui/CheckoutForm";
import {useSelector} from "react-redux";
import Image from "next/image";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc} from "firebase/firestore";
import {auth, db} from "@/lib/firebase/firebase";

export default function CheckoutPage() {


    const {items: cart, totalPrice} = useSelector(state => state.cart);
    const finalPrice = (Number(totalPrice) + 20).toFixed(2);
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    const router = useRouter();
    if (!hydrated) {
        // Optional: you can return a loading skeleton here
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></div>
        </div>
    }

    async function placeOrder(data, items, finalPrice) {
        const user = auth.currentUser;
        const orderId = `ORD-${Date.now()}`;
        const now = new Date();
        const orderDate = now.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
        const newOrder = {
            orderId,
            name: `${data.shipping.FirstName} ${data.shipping.LastName}`,
            cart: items,
            total: finalPrice,
            paymentMethod: data.payment,
            shippingAddress: data.shipping,
            status: "Pending",
            orderDate: orderDate,
            email:`${data.contact.Email}`,
        };

        if (user) {
            const userRef = doc(db, "users", user.uid);
            const orderRef = await addDoc(collection(db, "orders"), newOrder);


            await updateDoc(userRef, {
                orders: arrayUnion(newOrder),
            });
            const userCartRef = doc(db, "users", user.uid);
            await updateDoc(userCartRef, { cart: [] });
        }
        router.push(`/checkout/${orderId}`);
    }

    return (
        <div>
            <hr className={`border-0 h-[1px] bg-gray-300 -mt-4`}/>
            <div className={`grid grid-cols-[250px_1.5fr_1.5fr_1fr] font-inter gap-8`}>

                <div className={`col-start-2 pt-5`}>
                    <CheckoutForm onSubmit={(data) => placeOrder(data, cart, totalPrice)} items={cart}
                                  totalPrice={finalPrice}></CheckoutForm>
                </div>
                <div className={`col-start-3 col-span-2 bg-[#f5f5f5] pt-5 grid grid-cols-2 pl-5`}>
                    <div className={`col-start-1 col-span-1`}>
                        <div className={`max-h-[450px] overflow-y-auto`}>
                            {cart.map((item, index) => (<div key={`${item.id}-checkout`}>
                                <div className={`flex flex-row gap-2 my-5 justify-between`}>
                                    <div className={`flex flex-row gap-2`}>
                                        <div className={`relative h-[150px] w-[100px] overflow-hidden`}>
                                            <Image src={item.src} width={100} height={150}
                                                   alt={`product_image`}></Image>
                                            <div
                                                className={`absolute right-0 top-0 bg-black text-white rounded-md p-0.5 px-2 text-sm`}>{item.quantity}</div>
                                        </div>
                                        <div className={`flex flex-col gap-2`}>
                                            <h2 className={`text-[15px]`}>{item.name}</h2>
                                            <h3 className={`text-[13px] text-[#666666]`}>{item.category}</h3>
                                        </div>
                                    </div>
                                    <h3 className={`text-[14px]`}>${item.price}</h3>
                                </div>

                            </div>))}
                        </div>
                        <div className={`flex flex-col gap-3 mt-8`}>
                            <div className={`flex flex-col gap-1`}>
                                <div className={`flex flex-row justify-between text-[15px]`}>
                                    <h4>Subtotal · {cart.length}</h4>
                                    <h4>${totalPrice}</h4>
                                </div>

                                <div className={`flex flex-row justify-between text-[15px]`}>
                                    <h4>Shipping</h4>
                                    <h4>$20</h4>
                                </div>
                            </div>
                            <div className={`flex flex-row justify-between text-[16px] font-semibold`}>
                                <h1 className={``}>Total</h1>
                                <h1>${finalPrice}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}