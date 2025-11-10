"use client";
import {db} from "@/lib/firebase/firebase"
import {collection, getDocs, addDoc, doc, updateDoc} from "firebase/firestore";
import dynamic from "next/dynamic";
import {useEffect, useRef, useState} from "react";
import {fetchAllProducts} from "@/components/ui/Search";
import Image from "next/image";
import {SquarePen, Trash} from "lucide-react";
import EditProduct from "@/app/admin/products/components/EditProduct";
import AddProduct from "@/app/admin/products/components/AddProduct";
import RemoveProduct from "@/app/admin/products/components/RemoveProduct";
import {Input, Select, Pagination} from 'antd';
import {useSelector} from "react-redux";

export default function ProductsPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const theme = useSelector((state) => state.ui.darkmode);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    //to fetch stuff when admin first goes to dashboard/products
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const all = await fetchAllProducts();
                setAllProducts(all);
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
    const handleProductAdd = (newProduct) => {
        setAllProducts(prev => [...prev, newProduct]);
    }
    const RemoveProd = (DelProduct) => {
        setAllProducts(prev => prev.filter(p => p.id !== DelProduct.id));
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
    const [search, setSearch] = useState("");
    const filteredProducts = allProducts.filter((product) => {
        const matchesCategory =
            selectedCategory === "all" ||
            product.category?.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch =
            search.trim() === "" ||
            product.name?.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);


    const [editProduct, setEditProduct] = useState(null);
    const [addProduct, setAddProduct] = useState(null);
    const [removeProduct, setRemoveProduct] = useState(null);
    const searchTimeout = useRef(null);
    return (
        <div className={`flex flex-col mx-10 font-inter pb-5`}>
            <div className={`flex flex-row justify-between items-center mx-3`}>
                <div className={`flex flex-col gap-2`}>
                    <h2 className={`font-semibold text-2xl`}>Products</h2>
                    <p>Manage your product inventory</p>
                </div>
                <div>
                    <button className={`p-1.5 text-sm px-3 bg-indigo-600 rounded-md text-white cursor-pointer`}
                            onClick={() => {
                                setAddProduct(true)
                            }}>Add New Product
                    </button>
                </div>
            </div>
            {!loading && <div className={`flex flex-row justify-between gap-2 items-center mx-3`}>
                <div className={`w-60 mt-3`}>
                    <Select options={options}
                            defaultValue="all"
                            onChange={(value) => setSelectedCategory(value)}
                            className={`w-40`}

                    ></Select>
                </div>
                <div className={`mt-3`}>
                    <Input placeholder={`Search..`} onChange={(e) => {
                        const value = e.target.value;

                        if (searchTimeout.current) clearTimeout(searchTimeout.current);
                        searchTimeout.current=setTimeout(() => setSearch(value), 500);
                        setCurrentPage(1);
                    }}

                    ></Input>
                </div>
            </div>}

            {loading ? (
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="relative flex flex-col items-center">
                        <div
                            className="w-12 h-12 border-4 border-gray-300 border-t-[#155dfc] rounded-full animate-spin"></div>
                        <p className="text-gray-500 mt-3">Loading products...</p>
                    </div>
                </div>
            ) : (
                <div>
                    <table className="min-w-full border border-gray-300 rounded-md mt-5 font-sf">
                        <thead className={`${theme ? "bg-gray-400" : "bg-gray-100"} text-left`}>
                        <tr>
                            <th className="p-3 border-b border-gray-300">Image</th>
                            <th className="p-3 border-b border-gray-300">Name</th>
                            <th className="p-3 border-b border-gray-300">Category</th>
                            <th className="p-3 border-b border-gray-300">Price</th>
                            <th className="p-3 border-b border-gray-300 text-center">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {paginatedProducts.map((product) => (
                            <tr
                                key={product.id}
                                className={`${theme ? "" : "hover:bg-gray-50"} transition-colors duration-150`}
                            >
                                <td className="p-2">
                                    <div className="w-[80px] h-[80px] overflow-hidden rounded-md">
                                        <Image
                                            src={product.image.trimStart()}
                                            alt="prod_img"
                                            width={80}
                                            height={80}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </td>

                                <td className="p-2">{product.name}</td>
                                <td className="p-2 capitalize">{product.category}</td>
                                <td className="p-2 font-semibold">${product.price}</td>

                                <td className="p-2 text-center">
                                    <div className="flex flex-row justify-center gap-3">
                                        <button
                                            className="flex flex-row items-center gap-1 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 transition-all cursor-pointer"
                                            onClick={() => setEditProduct(product)}
                                        >
                                            <SquarePen className="w-4 h-4"/> Edit
                                        </button>
                                        <button
                                            className="flex flex-row items-center gap-1 text-red-600 border border-gray-300 px-3 py-1 rounded-md hover:bg-red-100 transition-all cursor-pointer"
                                            onClick={() => setRemoveProduct(product)}
                                        >
                                            <Trash className="w-4 h-4"/> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className={`mt-5 pb-5 flex justify-center`}>
                        <Pagination
                            current={currentPage}
                            total={filteredProducts.length}
                            pageSize={pageSize}
                            onChange={(page, size) => {
                                setCurrentPage(page);
                                setPageSize(size);
                            }}
                            showSizeChanger
                        /></div>
                </div>
            )}

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
            {addProduct && <div>
                <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex justify-center items-center z-20"
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
            {removeProduct && <div>
                <div className={`fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-20`}>
                    <div className={` bg-white rounded-lg shadow-lg p-5 `}>
                        <RemoveProduct product={removeProduct} onCancel={() => {
                            setRemoveProduct(false)
                        }}
                                       onProdDelete={RemoveProd}
                        ></RemoveProduct>
                    </div>
                </div>
            </div>}
        </div>
    )
}