import {motion, AnimatePresence} from "framer-motion";
import {useCart} from "@/context/CartContext";
import {RxCross1} from "react-icons/rx";
import Image from "next/image";
import {Trash} from "lucide-react";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useSelector, useDispatch} from "react-redux";
import {removeFromCart} from "@/features/cartSlice";

export default function CartSlide({setShowCart, showCart}) {
    const {items: cart, totalPrice} = useSelector(state => state.cart);
    const isEmpty = cart.length === 0;
    const dispatch = useDispatch();
    const darkmode = useSelector((state) => state.ui.darkmode);


    return (
        <>
            <div
                className="fixed inset-0 backdrop-blur-xs bg-black/10 z-10"
                onClick={() => setShowCart(false)}
            ></div>
            <motion.div
                className={`${darkmode ? "bg-[#121212]" : "bg-white"} fixed w-[500px] right-0 top-0 h-full overflow-y-auto z-20 shadow-lg`}
                initial={{x: "100%"}}
                animate={{x: 0}}
                exit={{x: "100%"}}
                transition={{type: "tween", duration: 0.6, ease: "easeInOut"}}>
                <div className={`flex flex-row justify-end mt-5 mr-2`}>
                    <RxCross1 onClick={() => {
                        setShowCart(false);
                    }}
                              className={`w-6 h-6 cursor-pointer`}></RxCross1>
                </div>
                <div className={`flex flex-col px-4 pt-1 font-sf font-medium text-[16px] pb-6`}>
                    <h2 className={`pb-5 font-medium text-[16px]`}>ADDED TO YOUR BASKET</h2>
                    <div className={`flex flex-col gap-2`}>

                        {isEmpty ? (<div className={`flex flex-col gap-2 font-sf mt-5`}>
                            <h2 className={`text-center font-normal text-[14px]`}>YOUR BASKET IS CURRENTLY EMPTY</h2>
                            <button className={`text-white bg-black text-[13px] h-10 cursor-pointer`}
                                    onClick={() => {
                                        setShowCart(false);
                                    }}>CONTINUE SHOPPING
                            </button>
                        </div>) : (
                            <>
                                {cart.map((cartItem, index) => (
                                    <div key={`${cartItem.id}-${index}`}
                                         className={`flex flex-row gap-2 justify-between pt-2`}>
                                        <div className={`flex flex-row gap-3`}>
                                            <div className="relative h-[150px] w-[100px] overflow-hidden">
                                                <Image
                                                    src={cartItem.src}
                                                    alt={cartItem.name || "clothing picture"}
                                                    fill
                                                    sizes="100px"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className={`flex flex-col justify-between`}>
                                                <div>
                                                    <h2 className={`font-extralight text-[14px]`}>{cartItem.name}</h2>
                                                    <div
                                                        className={`text-[10px] font-normal`}>{cartItem.category} / {cartItem.size}</div>
                                                </div>
                                                <h3 className={`font-extralight text-[14px] text-[#808080]`}>{cartItem.quantity}X</h3>
                                            </div>
                                        </div>
                                        <div className={`flex flex-col justify-between items-center`}>
                                            <Trash className={`w-3 h-3 cursor-pointer`}
                                                   onClick={() => {
                                                       dispatch(removeFromCart(cartItem));
                                                   }}></Trash>
                                            <h2 className={`font-extralight text-[14px]`}>${cartItem.price}</h2>
                                        </div>
                                    </div>)
                                )}
                                <div className={`mt-3`}>
                                    <hr/>
                                    <h3 className={`text-end mt-2 font-extralight text-[14px]`}>TOTAL:
                                        ${totalPrice}</h3>
                                    <div className={`flex flex-col gap-3 mt-5`}>
                                        <h3 className={`font-normal text-[10px]`}>*ALL ORDERS MAY TAKE UPTO 7 WORKING
                                            DAYS TO BE DELIVERED TO YOUR
                                            DOORSTEP</h3>
                                        <button
                                            className={`bg-black text-white w-full h-10 cursor-pointer text-[13px] font-normal `}>CHECK
                                            OUT
                                        </button>
                                        <Link href={`/cart`}>
                                            <button
                                                className={`border-1 w-full h-10 cursor-pointer text-[13px] font-normal`}
                                                onClick={() => {
                                                    setShowCart(false);
                                                }}>
                                                VIEW SHOPPING BASKET
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </>)
                        }
                    </div>
                </div>
            </motion.div>
        </>
    )
}