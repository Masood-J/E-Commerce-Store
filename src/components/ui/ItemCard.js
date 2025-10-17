import {Plus} from "lucide-react";
import Image from "next/image";
import {useCart} from "@/context/CartContext";
import {addToCart} from "@/features/cartSlice";
import {useDispatch} from "react-redux";
import Link from "next/link";
export default function ItemCard({src, category, name, price,id}) {
    const itemObject={
        name:name,
        category:category,
        price:price,
        src:src,
id:id
    }
    const dispatch = useDispatch();
    return (

        <div className={`font-sf mb-2 w-[370px]`}>
            <div className={`relative`}>
                <Link href={`polo/${id}`}>
                <div className={`flex items-center justify-center border-1 transition duration-300 ease-in-out hover:scale-102 cursor-pointer h-[450px]`}>
                <Image src={src} width={270} height={100} alt={`nothing`}
                       className={``}>
                </Image>
                </div>
                </Link>
                <div className={`rounded-full absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2 bg-white opacity-65 p-1.5`}>
                    <Plus className={`w-5 h-5 cursor-pointer text-black`}
                    onClick={()=>{
                        dispatch(addToCart(itemObject));
                    }}></Plus>
                </div>
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