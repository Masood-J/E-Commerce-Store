"use client";
import {useState, useContext, createContext, useEffect} from "react";
import {store} from "@/store/store";
import {Provider} from "react-redux";
const CartContext = createContext();

export default function Cart({children}) {

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export const useCart = () => useContext(CartContext);