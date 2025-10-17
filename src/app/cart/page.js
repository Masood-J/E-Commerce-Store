"use client"
import {useCart} from "@/context/CartContext"
import React from "react";
import Image from "next/image";
export default function Page() {

    const {cart,totalPrice} = useCart();
    return (
        <div className={`flex flex-col gap-2 mx-10 font-sf`}>
            <h2 className={`font-bold text-[25px]`}>Shopping Basket</h2>
            <div className={`scrollbar-thin overflow-y-scroll  max-h-[450px]`}>
            <div className={`grid grid-cols-[3fr_1fr_1fr] text-[11px] text-[#000000bf]`}>
                <div className={``}>PRODUCT</div>
                <div className={``}>QUANTIIY</div>
                <div className={`justify-self-end mr-2`}>TOTAL</div>
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
                        <div className={`justify-self-end text-[14px] mr-2`}>${item.price*item.quantity}</div>
                        {/* third column */}
                    </React.Fragment>
                ))}

            </div>

        </div>
            <hr className={`h-[1px] border-gray-300`}/>
            <div className={`flex flex-col items-end gap-2 font-sf pb-5`}>
<div className={`flex flex-row gap-3`}>
    <h2 className={`font-bold text-[16px]`}>Subtotal</h2>
    <h2 className={`font-semibold text-[16px] text-[#000000bf]`}>${totalPrice}</h2>
</div>
                <p className={`text-[13px]`}>Taxes and shipping calculated at checkout</p>
                <button className={`text-center bg-black text-white w-80 h-9 text-[13px] cursor-pointer`}>CHECK OUT</button>
                <button className={`text-center border-1 w-80 h-9 text-[13px] cursor-pointer`}>CONTINUE SHOPPING</button>
            </div>
        </div>
    )
}