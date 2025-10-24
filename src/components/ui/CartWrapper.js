
"use client";
import { useState } from "react";
import CartSlide from "./CartSlide";
import Header from "./Header";
import {AnimatePresence} from "framer-motion";
import Nav from "@/components/ui/Nav";

export default function CartWrapper({ children }) {
    const [showCart, setShowCart] = useState(false);
    const [showNav, setShowNav] = useState(false);

    return (
        <>
            <Header setShowCart={setShowCart} setShowNav={setShowNav} />
            {children}
            <AnimatePresence>
            {showCart &&
                <CartSlide setShowCart={setShowCart} showCart={showCart} />

            }
            </AnimatePresence>
            <AnimatePresence>
                {showNav &&
                <Nav setShowNav={setShowNav}>

                </Nav>}
            </AnimatePresence>
        </>
    );
}
