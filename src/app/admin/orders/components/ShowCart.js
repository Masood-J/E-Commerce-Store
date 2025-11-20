"use client";

import { useEffect, useState } from "react";

export default function ShowCart({ order, onCancel }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (order?.cart) setCartItems(order.cart);
    }, [order]);

    return (
        <div className="flex flex-col gap-3 font-inter w-96">
            <h2 className="font-semibold text-[19px]">Cart Items for {order.orderId}</h2>

            {cartItems.length === 0 ? (
                <p className="text-gray-500">No items in this order.</p>
            ) : (
                <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
                    {cartItems.map((item, index) => (
                        <div key={index} className="border-b border-gray-200 pb-2">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">
                                Quantity: {item.quantity} | Price: ${item.price}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end mt-4">
                <button
                    onClick={onCancel}
                    className="border border-gray-300 p-2 rounded-md hover:bg-gray-100 transition-all cursor-pointer"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
