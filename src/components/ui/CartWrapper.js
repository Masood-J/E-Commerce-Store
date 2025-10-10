
"use client";
import { useState } from "react";
import CartSlide from "./CartSlide";
import Header from "./Header";
import {AnimatePresence} from "framer-motion";

export default function CartWrapper({ children }) {
    const [showCart, setShowCart] = useState(false);

    return (
        <>
            <Header setShowCart={setShowCart} />
            {children}
            <AnimatePresence>
            {showCart &&
                <CartSlide setShowCart={setShowCart} showCart={showCart} />

            }
            </AnimatePresence>
        </>
    );
}
