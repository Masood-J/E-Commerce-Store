import {Plus} from "lucide-react";
import Image from "next/image";
import {useCart} from "@/context/CartContext";
import {addToCart} from "@/features/cartSlice";
import {useDispatch} from "react-redux";
import Link from "next/link";
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import { usePathname } from "next/navigation";

export default function ItemCard({src, category, name, price, id, path,isNew}) {
    const itemObject = {
        name: name, category: category, price: price, src: src, id: id
    }
    const [selectSize, setSelectedSize] = useState(false);
    const dispatch = useDispatch();
    const selectorRef = useRef(null);
    const darkmode = useSelector(state => state.ui.darkmode);
    const pathname = usePathname();
    const AtHome=pathname==='/'
    useEffect(() => {
        function handleClickOutside(event) {
            // if click is outside selectorRef, close selector
            if (selectorRef.current && !selectorRef.current.contains(event.target)) {
                setSelectedSize(false);
            }
        }

        if (selectSize) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selectSize]);

    return (

        <div className={`font-sf mb-2 ${AtHome?"w-[270px]":"w-[370px]"} ${darkmode ? "bg-[#1E1E1E]" : ""}`}>
            <div className={`relative border-1`}>
                <Link href={`${path}/${id}`}>
                    <div
                        className={`relative flex items-center justify-center  cursor-pointer h-[450px] overflow-hidden`}>

                        <Image src={src} fill alt={name}
                               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                               className={`object-cover  transition duration-300 ease-in-out hover:scale-102`}>
                        </Image>
                    </div>
                </Link>
                {!AtHome && isNew && (
                    <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded-full">
                        NEW
                    </div>
                )}
                {!AtHome &&
                <div
                    className={`rounded-full absolute left-1/2 bottom-0 -translate-x-1/2 ${selectSize ? "-translate-y-0" : "-translate-1/2"}  ${selectSize ? "" : "bg-white opacity-65"} ${selectSize ? "" : "p-1.5"} font-sf`}
                    ref={selectorRef}>
                    {selectSize ?
                        <motion.div
                            initial={{y: 100, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: 100, opacity: 0}}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            className="flex flex-col bg-white w-[370px]"
                        >
                            <div className={`flex flex-col ${darkmode ? "bg-[#1E1E1E]" : "bg-white"}  w-[370px]`}>
                                <div className={`flex flex-row justify-around h-10`}>
                                    <div
                                        onClick={() => {

                                            dispatch(addToCart({...itemObject, size: "S"}))
                                            setSelectedSize(false);
                                        }}
                                        className={`text-center border-1 border-r-0 flex-1 cursor-pointer transition duration-350 ease-in-out hover:${darkmode ? "bg-gray-700" : "bg-gray-200"} flex justify-center items-center`}>S
                                    </div>
                                    <div onClick={() => {

                                        dispatch(addToCart({...itemObject, size: "M"}))
                                        setSelectedSize(false);
                                    }}
                                         className={`flex-1 border-1 text-center cursor-pointer transition duration-350 ease-in-out hover:${darkmode ? "bg-gray-700" : "bg-gray-200"} flex justify-center items-center`}>M
                                    </div>
                                </div>
                                <div className={`flex flex-row justify-around h-10`}>
                                    <div onClick={() => {

                                        dispatch(addToCart({...itemObject, size: "L"}))
                                        setSelectedSize(false);
                                    }}
                                         className={`border-1 border-r-0 border-t-0 flex-1 text-center cursor-pointer transition duration-350 ease-in-out hover:${darkmode ? "bg-gray-700" : "bg-gray-200"} flex justify-center items-center`}>L
                                    </div>
                                    <div onClick={() => {

                                        dispatch(addToCart({...itemObject, size: "XL"}))
                                        setSelectedSize(false);
                                    }}
                                         className={`border-1 border-t-0 flex-1 text-center cursor-pointer transition duration-350 ease-in-out hover:${darkmode ? "bg-gray-700" : "bg-gray-200"} flex justify-center items-center`}>XL
                                    </div>
                                </div>
                                <div onClick={() => {

                                    dispatch(addToCart({...itemObject, size: "XXL"}))
                                    setSelectedSize(false);
                                }}
                                     className={`text-center border-1 border-b-0 border-t-0 cursor-pointer h-10 transition duration-350 ease-in-out hover:${darkmode ? "bg-gray-700" : "bg-gray-200"} flex justify-center items-center`}>
                                    XXL
                                </div>
                            </div>
                        </motion.div> : <Plus className={`w-5 h-5 cursor-pointer text-black`}
                                              onClick={() => {
                                                  setSelectedSize(true);
                                              }}></Plus>}


                </div>}
            </div>
            <div className={`border-1 border-t-0 border-black`}>
                <Link href={`polo/${id}`}>
                    <div className={`flex flex-col gap-0 px-4 pt-2 cursor-pointer`}>
                        <h2 className={`font-light text-[14px]`}>{name}</h2>
                        <h2 className={`text-gray-600 text-[12px] font-light`}>{category}</h2>
                    </div>
                </Link>
                <div className={`flex flex-row justify-between font-light text-[14px] px-4 py-4`}>
                    <h2>${price}</h2>
                </div>
            </div>
        </div>

    )
}