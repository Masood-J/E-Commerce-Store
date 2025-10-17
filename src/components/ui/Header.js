"use client";
import ItemCard from "@/components/ui/ItemCard";
import AddItems from "@/components/ui/AddItems";
import {Menu} from "lucide-react";
import Image from "next/image";
import {ShoppingBag} from "lucide-react";
import {User} from "lucide-react";
import {Search} from "lucide-react";
import Link from "next/link";
import {useState} from "react";
import CartSlide from "@/components/ui/CartSlide";
import {usePathname} from "next/navigation";
import {useCart} from "@/context/CartContext";
export default function Header({setShowCart}) {
    const pathname = usePathname();
    const isDisabled=pathname==="/cart";
const{totalItems}=useCart();
    return (
        <header className={`flex flex-row justify-between items-center mx-5 pt-1.5 relative`}>
            <div className={`flex flex-row gap-5 items-center text-2xl font-dm-sans font-normal`}>
                <Menu className={`w-6 h-4.5 cursor-pointer`}></Menu>
                <Link href={`/`}>
                <Image alt={`logo`} src={`/U.png`} className={`mt-0.5`} width={100} height={100}></Image>
                </Link>
            </div>
            <div className={`flex flex-row gap-10 items-center mr-5 -mt-7`}>
                <Search className={`w-4.5 h-4.5 cursor-pointer`}></Search>
                <User className={`w-4.5 h-4.5 cursor-pointer`}></User>
                <div className={`relative cursor-pointer`}
                     onClick={()=>{
                         if(!isDisabled){
                             setShowCart(true);
                         }

                     }}>
                    {totalItems >0 &&
                    <div className={`absolute -top-3 -right-3 bg-red-500 w-4 h-4 rounded-full text-white flex items-center justify-center`}>
                        <h4 className={`text-[10px]`}>{totalItems}</h4>
                    </div>}
                <ShoppingBag className={`w-4.5 h-4.5 `}
                ></ShoppingBag>
                </div>
            </div>
        </header>
    )
}