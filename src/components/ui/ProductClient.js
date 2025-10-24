"use client";

import { useState } from "react";
import Image from "next/image";
import {addToCart} from "@/features/cartSlice";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
export default function ProductClient({ product }) {
    const [selectedSize, setSelectedSize] = useState(null);
const darkmode=useSelector((state) => state.ui.darkmode);
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };
    const dispatch = useDispatch();
    const itemObject={
        name:product.name,
        category:product.category,
        price:product.price,
        src:product.image,
        id:product.id
    }

    return (
        <div className="grid grid-cols-[200px_1fr_100px_1fr_200px] gap-2 min-h-screen">
            <div className="relative col-start-2 h-[550px] w-full place-self-center self-start overflow-hidden border-1 p-1">
                <Image
                    src={product.image}
                    alt={product.name || "Product Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
            </div>

            <div className="col-start-4 col-span-1 mt-12">
                <div className="flex flex-col gap-8 font-sf">
                    <h3 className="text-[20px]">{product.name}</h3>
                    <h4 className="text-[14px] font-bold">$ {product.price}</h4>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-[15px] font-semibold">Description</h3>
                        <p className="text-[13px]">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Beatae, corporis eos exercitationem fugit impedit labore minus modi non nostrum obcaecati odio optio placeat, praesentium provident, quia sed similique ullam unde?
                        </p>
                    </div>

                    <div className="flex flex-col gap-5 font-semibold text-[13px]">
                        <div className={`flex flex-row items-center `}>
                            <h2 className={`pr-4.5`}>COLORS</h2>
                            <div className="flex flex-row gap-2 mt-0 cursor-pointer">
                                {Array.isArray(product.color) ? (
                                    product.color.map((clr, index) => (
                                        <div
                                            key={index}
                                            className="w-6 h-6 rounded-full border cursor-pointer"
                                            style={{ backgroundColor: clr }}
                                            title={clr}
                                        ></div>
                                    ))
                                ) : (
                                    <div
                                        className="w-6 h-6 rounded-full border"
                                        style={{ backgroundColor: product.color }}
                                        title={product.color}
                                    ></div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-row gap-3 items-center">
                            <h2 className="min-w-14">SIZE</h2>
                            <div className="flex flex-row gap-3 font-normal">
                                {["S", "M", "L", "XL", "XXL"].map((size) => (
                                    <div
                                        key={size}
                                        onClick={() => handleSizeSelect(size)}
                                        className={`cursor-pointer border px-2 py-1 rounded ${
                                            selectedSize === size
                                                ? `${darkmode?"bg-gray-600":"bg-black"} text-white`
                                                : `${darkmode?"hover:bg-gray-600":"hover:bg-gray-100"}`
                                        }`}
                                    >

                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-row gap-3">
                            <h2 className="min-w-14">GENDER</h2>
                            <h3 className="font-normal">MEN</h3>
                        </div>
                    </div>

                    <button className={`border-1 h-12 text-[12px] cursor-pointer mt-4 bg-${darkmode?"[#1E1E1E]":""}`}
                    onClick={()=>{dispatch(addToCart(itemObject))}}>
                         ADD TO BASKET
                    </button>
                </div>
            </div>
        </div>
    );
}
