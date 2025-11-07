"use client";
import {db} from "@/lib/firebase/firebase"
import {collection, getDocs, addDoc, doc, updateDoc} from "firebase/firestore";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import {fetchAllProducts} from "@/components/ui/Search";
import Image from "next/image";
import {SquarePen, Trash} from "lucide-react";
import EditProduct from "@/app/admin/products/components/EditProduct";
import AddProduct from "@/app/admin/products/components/AddProduct";
import RemoveProduct from "@/app/admin/products/components/RemoveProduct";
const Select = dynamic(() => import('react-select'), {ssr: false});
export default function ProductsPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");


    //to fetch stuff when admin first goes to dashboard/products
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const cached = localStorage.getItem("products");
                if (cached) {
                    setAllProducts(JSON.parse(cached));
                    setLoading(false);
                }

                const all = await fetchAllProducts();
                setAllProducts(all);
                localStorage.setItem("products", JSON.stringify(all));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const all = await fetchAllProducts();
            setAllProducts(all);
            localStorage.setItem("products", JSON.stringify(all));
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };
    //handle product save locally

    const handleProductSave = (updatedProduct) => {
        setAllProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    }
    const handleProductAdd=(newProduct) => {
        setAllProducts(prev=>[...prev, newProduct]);
    }


    const options = [
        {value: 'all', label: "All Categories"},
        {
            value: 'Polo Shirts', label: 'Polo',
        },
        {value: 'outerwear', label: "Outerwear"},
        {value: 'casual', label: "Casual"},
        {value: 'jeans', label: "Jeans"},
        {value: 'shirts', label: "Shirts"},]
    const filteredProducts =
        selectedCategory === "all"
            ? allProducts
            : allProducts.filter(
                (product) =>
                    product.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
    const [editProduct, setEditProduct] = useState(null);
    const [addProduct, setAddProduct] = useState(null);
    return (
        <div className={`flex flex-col mx-10 font-inter pb-5`}>
            <div className={`flex flex-row justify-between items-center`}>
                <div className={`flex flex-col gap-2`}>
                    <h2 className={`font-semibold text-2xl`}>Products</h2>
                    <p>Manage your product inventory</p>
                </div>
                <div>
                    <button className={`p-2 px-3 bg-indigo-600 rounded-md text-white cursor-pointer`}
                    onClick={()=>{
                        setAddProduct(true)
                    }}>Add New Product
                    </button>
                </div>
            </div>
            <div className={`w-60 mt-3`}>
                <Select options={options} defaultValue={options[0]}
                        onChange={(option) => setSelectedCategory(option.value)}
                ></Select>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="relative flex flex-col items-center">
                        <div
                            className="w-12 h-12 border-4 border-gray-300 border-t-[#155dfc] rounded-full animate-spin"></div>
                        <p className="text-gray-500 mt-3">Loading products...</p>
                    </div>
                </div>
            ) : (<div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 justify-items-center gap-y-3`}>
                {filteredProducts.map((product) => (
                    <div key={product.id} className={`border-1 border-gray-300 rounded-md`}>
                        <div className="w-[280px] h-[350px] overflow-hidden rounded-md">
                            <Image
                                src={product.image.trimStart()}
                                alt="prod_img"
                                width={150}
                                height={200}
                                className="object-cover w-full h-full hover:scale-105 transition-all duration-200 ease-in-out"
                            />
                        </div>
                        <div className={`mx-3 mt-5 pb-2 font-sf flex flex-col gap-2`}>
                            <div className={`flex flex-row justify-between`}>
                                <h2>{product.name}</h2>
                                <h3 className={`rounded-md border-1 border-gray-400 px-2`}>{product.category}</h3>
                            </div>
                            <h2 className={`font-semibold`}>${product.price}</h2>
                            <div className={`flex flex-row justify-between`}>
                                <button
                                    className={`flex flex-row gap-1 items-center border-1 border-gray-300 px-3 py-1 rounded-md cursor-pointer hover:bg-gray-100`}
                                    onClick={() => {
                                        setEditProduct(product);
                                    }}>
                                    <SquarePen className={`w-4 h-4`}></SquarePen> Edit
                                </button>
                                <button
                                    className={`flex flex-row gap-1 items-center text-red-600 px-3 py-1 rounded-md border-1 border-gray-300 cursor-pointer hover:bg-red-100`}>
                                    <Trash className={`w-4 h-4`}></Trash> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>)}

            {editProduct &&

                <div>
                    <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex justify-center items-center z-50"
                    >
                        <div className="relative bg-white rounded-lg shadow-lg p-5">
                            <EditProduct product={editProduct} onCancel={() => setEditProduct(null)}
                                         onSave={(updatedProduct) => {
                                             handleProductSave(updatedProduct);
                                         }}></EditProduct>
                        </div>
                    </div>
                </div>
            }
            {addProduct &&  <div>
                <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex justify-center items-center z-50"
                >
                    <div className="relative bg-white rounded-lg shadow-lg p-5">
                        <AddProduct onCancel={() => setAddProduct(null)}
                                     onSave={(newProduct) => {
                                         handleProductAdd(newProduct);
                                     }}
                        ></AddProduct>
                    </div>
                </div>
            </div>}
        </div>
    )
}