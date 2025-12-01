"use client";
import {Menu} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {UserRound} from "lucide-react";
import {RiShoppingBag4Line} from "react-icons/ri";
import {ShoppingBag} from "lucide-react";
import {db} from "@/lib/firebase/firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";
import ItemCard from "@/components/ui/ItemCard";
import {useEffect, useState} from "react";
import AddItems from "@/components/ui/AddItems";
import ScrollTop from "@/components/ui/ScrollTop";

export default function ShirtsPage() {
    const [products, setProducts] = useState([]);
    const [IsAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);
    const addItem = () => {
        setIsAdding(prevState => !prevState);
    }


    useEffect(() => {
        async function fetchProducts() {
            const querySnapshot = await getDocs(collection(db, "product", "catalog", "shirts"));
            const items = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setProducts(items)
            setLoading(false);
        }

        fetchProducts();
    },);
    if (loading) {
        return (<div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></div>
        </div>);
    }
    return (

        <div className={`min-h-screen`}>
            <main className={`mt-8 pt-5`}>
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center`}>
                    {products.map(product => (
                        <ItemCard key={product.id} id={product.id} src={product.image} name={product.name}
                                  category={product.category}
                                  price={product.price} isNew={product.isNew}
                                  path={`shirts`}></ItemCard>))}
                </div>
            </main>


        </div>)
}