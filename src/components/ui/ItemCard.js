
import Image from "next/image";

export default function ItemCard({src,category,name,price}) {

    return(
        <div className={`font-sf mb-2`}>
            <Image src={src} width={370} height={100} alt={`nothing`} className={`border-1 border-black transition duration-300 ease-in-out hover:scale-102`}></Image>
            <div className={`border-1 border-black`}>
            <h2 className={`text-gray-600 text-sm px-4 pt-2`}>{category}</h2>
            <div className={`flex flex-row justify-between font-semibold px-4 py-4`}>
                <h2>{name}</h2>
                <h2>${price}</h2>
            </div>
            </div>
        </div>
    )
}