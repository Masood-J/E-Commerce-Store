"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollTop() {
    const pathname = usePathname();

    useEffect(() => {
        const container = document.getElementById("scroll-container");
        if (container) {
            container.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [pathname]);

    return null;
}