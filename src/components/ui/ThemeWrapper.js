"use client";
import { useSelector } from "react-redux";
import {authListener} from "@/lib/firebase/authlistener";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {SyncCart} from "@/lib/firebase/syncCart";
export default function ThemeProviderWrapper({ children }) {
    const darkmode = useSelector((state) => state.ui.darkmode);
    const dispatch=useDispatch();
    useEffect(() => {
        authListener(dispatch);
    }, [dispatch]);

    SyncCart();
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