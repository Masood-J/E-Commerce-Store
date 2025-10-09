import ItemCard from "@/components/ui/ItemCard";
import AddItems from "@/components/ui/AddItems";
import {Menu} from "lucide-react";
import Link from 'next/link';
import Image from "next/image";
import {ShoppingBag} from "lucide-react";
import {User} from "lucide-react";
import {Search} from "lucide-react";

export default function Header() {

    return (
        <header className={`flex flex-row justify-between items-center mx-5 pt-1.5`}>
            <div className={`flex flex-row gap-5 items-center text-2xl font-dm-sans font-normal`}>
                <Menu className={`w-6 h-4.5 cursor-pointer`}></Menu>
                <Image alt={`logo`} src={`/U.png`} className={`mt-0.5`} width={100} height={100}></Image>
            </div>
            <div className={`flex flex-row gap-10 items-center mr-5 -mt-7`}>
                <Search className={`w-4.5 h-4.5 cursor-pointer`}></Search>
                <User className={`w-4.5 h-4.5 cursor-pointer`}></User>
                <ShoppingBag className={`w-4.5 h-4.5 cursor-pointer`}></ShoppingBag>
            </div>
        </header>
    )
}