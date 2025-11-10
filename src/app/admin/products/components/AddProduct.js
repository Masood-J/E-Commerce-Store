"use client";
import {useState} from "react";
import Select from "react-select";
import {db} from "@/lib/firebase/firebase";
import {collection, addDoc} from "firebase/firestore";
import {DotLoader} from "@/app/admin/products/components/DotLoader";

export default function AddProduct({onSave, onCancel}) {
    const [adding, setAdding] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        category: "",
        price: "",
    });

    const categoryOptions = [
        {value: "Polo", label: "Polo Shirts"},
        {value: "Outerwear", label: "Outerwear"},
        {value: "Casual", label: "Casual"},
        {value: "Jeans", label: "Jeans"},
        {value: "Shirts", label: "Shirts"},
    ];

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleCategoryChange = (selectedOption) => {
        setFormData((prev) => ({...prev, category: selectedOption.value}));
    };

    const handleAddProduct = async () => {
        if (!formData.name || !formData.category || !formData.price || !formData.image) {
            alert("Please fill in all fields before adding a product.");
            return;
        }

        try {
            setAdding(true);
            const category=formData.category.toLowerCase();
            const collectionRef = collection(db, "product","catalog",`${category}`);
            const docRef = await addDoc(collectionRef, {
                name: formData.name,
                image: formData.image,
                category: formData.category,
                price: formData.price,
            });

            const newProduct = {id: docRef.id, ...formData};
            if (onSave) onSave(newProduct);
        } catch (err) {
            console.error("Error adding product:", err);
        } finally {
            setAdding(false);
            onCancel();
        }
    };

    return (
        <div className="flex flex-col gap-2 font-inter w-90">
            <h2 className="font-semibold text-[19px]">Add New Product</h2>

            <label htmlFor="name" className="text-[16px]">Product Name</label>
            <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#f3f3f5] p-1.5 outline-0 focus:ring-3 focus:ring-gray-300 rounded-md"
            />

            <label htmlFor="category" className="text-[16px]">Category</label>
            <Select
                options={categoryOptions}
                onChange={handleCategoryChange}
                className="text-[15px]"
            />

            <label htmlFor="price" className="text-[16px]">Price ($)</label>
            <input
                name="price"
                type="text"
                value={formData.price}
                onChange={handleChange}
                className="bg-[#f3f3f5] p-1.5 outline-0 focus:ring-3 focus:ring-gray-300 rounded-md"
            />

            <label htmlFor="link" className="text-[16px]">Image URL</label>
            <input
                name="image"
                type="text"
                value={formData.image}
                onChange={handleChange}
                className="bg-[#f3f3f5] p-1.5 outline-0 focus:ring-3 focus:ring-gray-300 rounded-md"
            />

            <div className="flex flex-row gap-3 justify-between pt-4">
                <button
                    className="text-center border-1 border-gray-200 p-2 rounded-md flex-1 cursor-pointer hover:bg-gray-100 transition-all"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    className="text-center bg-[#155dfc] text-white flex-1 p-2 rounded-md cursor-pointer hover:bg-blue-700 transition-all"
                    onClick={handleAddProduct}
                    disabled={adding}
                >
                    {adding ? <DotLoader /> : "Add Product"}
                </button>
            </div>
        </div>
    );
}
