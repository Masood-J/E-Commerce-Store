"use client";
import ItemCard from "@/components/ui/ItemCard";
import AddItems from "@/components/ui/AddItems";
import {Menu} from "lucide-react";
import Image from "next/image";
import {ShoppingBag} from "lucide-react";
import {User} from "lucide-react";
import Search from "@/components/ui/Search";
import Link from "next/link";
import {useEffect, useState} from "react";
import CartSlide from "@/components/ui/CartSlide";
import {usePathname} from "next/navigation";
import {Sun, Moon} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "@/features/uiSlice";

export default function Header({setShowCart, setShowNav}) {
    const pathname = usePathname();
    const isDisabled = pathname === "/cart";
    const [isClient, setIsClient] = useState(false);
    const darkmode = useSelector(state => state.ui.darkmode);
    const loggedin = useSelector(state => state.auth.loggedIn)
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const dispatch = useDispatch();
    const AdminUi = pathname.startsWith("/admin")
    useEffect(() => {
        setIsClient(true);
    }, [])
    const totalItems = useSelector(state => state.cart.totalItems);

    function LightToggle() {
        if (darkmode === true) {
            return <Moon onClick={() => {
                dispatch(toggleTheme())
            }}
                         className={`cursor-pointer`}></Moon>
        } else if (darkmode === false) {
            return <Sun onClick={() => {
                dispatch(toggleTheme())
            }}
                        className={`cursor-pointer`}></Sun>
        }
    }

    return (
        <header className={`flex flex-row justify-between items-center mx-5 py-5.5 relative`}>
            <div className={`flex flex-row gap-5 items-center text-2xl font-dm-sans font-normal`}>
                {!AdminUi && <Menu className={`w-6 h-4.5 cursor-pointer`}
                                   onClick={() => {
                                       setShowNav(true)
                                   }}></Menu>}

                <Link href={`/`}>
                    <div className="w-[100px] h-[70px] flex items-center justify-center">
                        <Image
                            alt="logo"
                            src={darkmode ? "/U1.png" : "/U2.png"}
                            className="object-contain"
                            width={100}
                            height={100}
                        />
                    </div>
                </Link>
            </div>
            <div className={`flex flex-row gap-10 items-center mr-5 `}>
                <LightToggle></LightToggle>
                {!AdminUi && <Search className={``}></Search>}
                <Link
                    href={
                        loggedin === null
                            ? ""
                            : loggedin
                                ? isAdmin
                                    ? "/admin/dashboard"
                                    : "/account"
                                : "/account/login"
                    }
                >
                    <User className={`w-4.5 h-4.5 cursor-pointer`}></User>
                </Link>
                {!AdminUi && <div className={`relative cursor-pointer`}
                                  onClick={() => {
                                      if (!isDisabled) {
                                          setShowCart(true);
                                      }

                                  }}>
                    {isClient && totalItems > 0 &&
                        <div
                            className={`absolute -top-3 -right-3 bg-red-500 w-4 h-4 rounded-full text-white flex items-center justify-center`}>
                            <h4 className={`text-[10px]`}>{totalItems}</h4>
                        </div>}
                    <ShoppingBag className={`w-4.5 h-4.5 `}
                    ></ShoppingBag>
                </div>}

            </div>
        </header>
    )
}