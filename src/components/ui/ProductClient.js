"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductClient({ product }) {
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className="grid grid-cols-[200px_1fr_100px_1fr_200px] gap-2">
            <div className="col-start-2 place-self-center border-1 p-15">
                <Image
                    src={product.image}
                    alt="Product Image"
                    width={300}
                    height={200}
                    className=""
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
                        <div>
                            <h2>COLORS</h2>
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
                                                ? "bg-black text-white"
                                                : "hover:bg-gray-100"
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

                    <button className="border-1 h-12 text-[12px] cursor-pointer mt-4">
                         ADD TO BASKET
                    </button>
                </div>
            </div>
        </div>
    );
}
