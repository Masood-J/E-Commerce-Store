"use client";
import {useState, useContext, createContext, useEffect} from "react";

const CartContext=createContext();

export default function Cart({children}) {
const [cart,setCart]=useState([]);
    useEffect(() => {
        const storedData = localStorage.getItem("cart");
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                if (Array.isArray(parsed)) {
                    setCart(parsed.filter(item => item && item.id));
                }
            } catch (error) {
                console.error("Failed to parse cart data:", error);
                localStorage.removeItem("cart");
            }
        }
    }, []);
    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart));
    },[cart]);
const AddToCart=(item)=>{


    setCart((prev)=>{
        const existing=prev.find(e=>e.id===item.id);
        if(existing){
            return prev.map((itemObj)=>{
                if(itemObj.id===item.id){
                   return {...itemObj,quantity:itemObj.quantity+1};
                }
                else{
                    return itemObj;
                }
            })
        }
        else {
            return [...prev, {...item, quantity: 1}]

        }

    })
}
const removeFromCart=(item)=>{
    setCart((prev)=>{
       return prev.filter((cartItem)=>cartItem.id!==item.id)
    })
}


    return(
        <CartContext.Provider value={{cart,AddToCart,removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);