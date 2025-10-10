import {Plus} from "lucide-react";
import Image from "next/image";
import {useCart} from "@/context/CartContext";

export default function ItemCard({src, category, name, price,id}) {
    const itemObject={
        name:name,
        category:category,
        price:price,
        src:src,
id:id
    }

    const {AddToCart,cart} = useCart();
    return (
        <div className={`font-sf mb-2`}>
            <div className={`relative`}>
                <Image src={src} width={370} height={100} alt={`nothing`}
                       className={`border-1 border-b-1 border-black transition duration-300 ease-in-out hover:scale-102 cursor-pointer`}>
                </Image>
                <div className={`rounded-full absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2 bg-white opacity-65 p-1.5`}>
                    <Plus className={`w-5 h-5 cursor-pointer text-black`}
                    onClick={()=>{
                        AddToCart(itemObject);
                    }}></Plus>
                </div>
            </div>
            <div className={`border-1 border-t-0 border-black`}>
                <div className={`flex flex-col gap-0 px-4 pt-2 cursor-pointer`}>
                <h2 className={`font-light text-[14px]`}>{name}</h2>
                <h2 className={`text-gray-600 text-[12px] font-light`}>{category}</h2>
                </div>
                <div className={`flex flex-row justify-between font-light text-[14px] px-4 py-4`}>
                    <h2>${price}</h2>
                </div>
            </div>
        </div>
    )
}