"use client";
import {useState, useEffect} from "react";
import Select from "react-select/base";
import {db} from "@/lib/firebase/firebase";
import {doc, updateDoc} from "firebase/firestore";
import {DotLoader} from "@/app/admin/products/components/DotLoader";

export default function EditProduct({product, onCancel, onSave}) {
    const [productSet, setProductSet] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        category: "",
        price: "",
        id: ""
    });


    useEffect(() => {
        if (product) setFormData(product);
    }, [product]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSave = async () => {
        try {
            let {category, id, ...updatedData} = formData;
            category = category.toLowerCase();
            if (category === "polo shirts") {
                category = "polo"
            }
            setProductSet(true);
            const productDef = doc(db, `product/catalog/${category}/${id}`)
            await updateDoc(productDef, updatedData)
            if (onSave) onSave(formData);
        } catch (err) {
            console.error("Error updating product:", err);
        } finally {
            setProductSet(false);
            onCancel();
        }
    }

    return (
        <div className={`flex flex-col gap-2 font-inter w-90`}>
            <h2 className={`font-semibold text-[19px]`}>Edit Products</h2>
            <label htmlFor="name" className={`text-[16px]`}>Product Name</label>
            <input name={`name`} type="text" value={formData.name} onChange={handleChange}
                   className={`bg-[#f3f3f5] p-1.5 outline-0 focus:ring-3 focus:ring-gray-300 rounded-md transition-all duration-200 ease-in-out`}/>
            <label htmlFor="category" className={`text-[16px]`}>Category</label>
            <input name={`category`} type="text" value={formData.category}
                   className={`bg-[#f3f3f5] p-1.5 focus:ring-3 focus:ring-gray-300 outline-0 rounded-md transition-all duration-200 ease-in-out`}
                   readOnly={true}/>
            <label htmlFor="price" className={`text-[16px]`}>Price ($)</label>
            <input name={`price`} type="text" value={formData.price} onChange={handleChange}
                   className={`bg-[#f3f3f5] p-1.5 focus:ring-3 focus:ring-gray-300 outline-0 rounded-md transition-all duration-200 ease-in-out`}/>
            <label htmlFor="link" className={`text-[16px]`}>Image URL</label>
            <input name={`image`} type="text" value={formData.image} onChange={handleChange}
                   className={`bg-[#f3f3f5] p-1.5 focus:ring-3 focus:ring-gray-300 outline-0 rounded-md transition-all duration-200 ease-in-out`}/>
            <div className={`flex flex-row gap-3 justify-between pt-4`}>
                <button
                    className={`text-center border-1 border-gray-200 p-2 rounded-md flex-1 cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out`}
                    onClick={onCancel}>Cancel
                </button>
                <button
                    className={`text-center bg-[#155dfc] text-white flex-1 p-2 rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-200 ease-in-out`}
                    onClick={handleSave}>
                    {productSet ? <DotLoader></DotLoader> : " Update Product"}
                </button>
            </div>


        </div>
    );
}
