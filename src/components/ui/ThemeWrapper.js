"use client";
import { useSelector } from "react-redux";

export default function ThemeProviderWrapper({ children }) {
    const darkmode = useSelector((state) => state.ui.darkmode);

    return (
        <div
            className={`transition-colors duration-300 ${
                darkmode ? "bg-[#121212] text-gray-100" : "bg-white text-black"
            }`}
        >
            {children}
        </div>
    );
}