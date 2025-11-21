"use client";
import HeroCarousal from "@/components/ui/HeroCarousal"
import Image from "next/image"
import Link from "next/link"
import {fetchAllProducts} from "@/components/ui/Search";
import {useEffect, useState} from "react";
import ProductSlider from "@/components/ui/ProductSlider";
export default function Home() {
    const [loading, setLoading] = useState(false);
    const [all, setAll] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const all = await fetchAllProducts();
                setAll(all);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filteredProducts = all.filter(product => product.isNew === true);

    const featured_products = [{
        name: "Shirts", id: 1, image: "/man-shirts.jpg",
        link: "/catalog/shirts"

    }, {
        name: "Polo", id: 2, image: "/man-polo.jpg",
        link: "/catalog/polo"

    },
        {
            name: "Casual",
            id: 5,
            image: "/causal-men.jpg",
            link: "/catalog/casual"
        }, {
            name: "Jeans", id: 3, image: "/men-jeans.jpg",
            link: "/catalog/jeans"
        }, {
            name: "Outerwear", id: 4, image: "/man-winter.jpg",
            link: "/catalog/outerwear"
        }]


    return (
        <main className={`pb-10`}>
        <HeroCarousal></HeroCarousal>
        <h2 className={`text-center text-5xl font-pep my-14 `}>Browse Products</h2>
        <div className={`flex flex-row gap-2 justify-around mt-5`}>
            {featured_products.map((item, i) => {
                return (<div key={item.id}
                             className={`relative gap-2 w-60 h-60 cursor-pointer hover:scale-105 duration-350 transition-all ease-in-out`}>
                    <Link href={item.link}>
                        <Image
                            src={item.image}
                            width={200}
                            height={20}
                            alt={item.name}
                            className="object-cover w-full h-full brightness-80 rounded-md"
                        />     <h2
                        className={`absolute inset-0 flex justify-center items-center text-white font-dm-sans font-bold text-3xl`}>{item.name}</h2>
                    </Link>
                </div>)
            })}
        </div>
        <h2 className={`text-center text-5xl font-pep my-14 `}>New Arrivals</h2>
<div className={`flex flex-row gap-2 justify-around mt-5`}>
    {loading ? (
        <div className="w-full flex justify-center items-center py-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    ) : (
        <ProductSlider products={filteredProducts} />
    )}


</div>


    </main>);
}