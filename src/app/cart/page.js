"use client"
import {useCart} from "@/context/CartContext"
import React from "react";
import Image from "next/image";

export default function Page() {

    const {cart} = useCart();
    return (
        <div className={`flex flex-col gap-2 mx-10 font-sf`}>
            <h2 className={`font-bold text-[25px]`}>Shopping Basket</h2>
            <div className={`overflow-y-auto max-h-[450px]`}>
            <div className={`grid grid-cols-[3fr_1fr_1fr] text-[11px] text-[#000000bf]`}>
                <div className={``}>PRODUCT</div>
                <div className={``}>QUANTIIY</div>
                <div className={`justify-self-end`}>TOTAL</div>
            </div>
            <hr className={`h-[1px] border-gray-300`}/>
            <div className={`grid grid-cols-[3fr_1fr_1fr] gap-y-6 pt-5`}>
                {cart.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className={`flex flex-row gap-9`}>
                            <Image src={item.src} width={100} height={100} alt={`Cloth Image`}></Image>
                            <div className={`flex flex-col gap-2`}>
                                <h2 className={`text-[14px] font-bold`}>{item.name}</h2>
                                <h3 className={`text-[14px]`}>${item.price}</h3>
                                <div className={`text-[12px]`}>
                                    Category: {item.category}
                                </div>
                            </div>
                        </div>
                        {/* first column */}
                        <div className={`text-[14px]`}>{item.quantity}</div>
                        {/* second column */}
                        <div className={`justify-self-end text-[14px]`}>${item.price*item.quantity}</div>
                        {/* third column */}
                    </React.Fragment>
                ))}

            </div>

        </div>
            <hr className={`h-[1px] border-gray-300`}/>
            <div className={`flex flex-col items-end gap-2`}>
<div className={`flex flex-row gap-3`}>
    <h2>Subtotal</h2>
    <h2>$ Total Price</h2>
</div>
                <p>Taxes and shipping calculated at checkout</p>
                <button className={`text-center bg-black text-white w-70 h-7`}>CHECK OUT</button>
                <button className={`text-center border-1 w-70 h-7`}>CONTINUE SHOPPING</button>
            </div>
        </div>
    )
}