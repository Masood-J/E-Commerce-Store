"use client";
import {useState} from "react";
import {X} from "lucide-react";
import { db } from "@/lib/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
export default function AddItems({addItem,fetchProducts}) {
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [category, setCategory] = useState("");
const [imageSrc, setImageSrc] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await addDoc(collection(db, "products"), {
                name,
                price: parseFloat(price),
                category,
                image:imageSrc,
                createdAt: new Date(),
            });

            // Clear form
            setName("");
            setPrice("");
            setCategory("");
            setImageSrc("");

            alert("✅ Product added successfully!");
            addItem(); // close modal
        } catch (err) {
            console.error("Error adding product:", err);
            alert("❌ Failed to add product. Check console for details.");
        }
    };

    return(
        <form onSubmit={handleSubmit}>
        <div className={`bg-[#EDEBEB] p-3 w-[400px]`}
             onClick={(e) => e.stopPropagation()}
        >
            <div className={`flex flex-row justify-between`}>
                <h2 className={`text-xl font-medium`}>Add Item</h2>
                <button onClick={addItem} className={`cursor-pointer`}><X></X></button>
            </div>
            <div className={`flex flex-col`}>
                <div className={`flex flex-row gap-2`}>
                <label htmlFor="name">Product Name:</label>
                <input type="text" name={name} onChange={(e) => setName(e.target.value)} placeholder={`Enter Item Name`} />
                </div>
                <div className={`flex flex-row gap-2`}>
                    <label htmlFor="Category">Product Category:</label>
                    <input type="text" name={`Category`} onChange={(e) => setCategory(e.target.value)} placeholder={`Enter Product Type`} />
                </div>
                <div className={`flex flex-row gap-2`}>
                    <label htmlFor="name">Product Price:</label>
                    <input type="text" name={`price`} onChange={(e) => setPrice(e.target.value)} placeholder={`Enter Item Name`} />
                </div>
                <div className={`flex flex-row gap-2`}>
                    <label htmlFor="ProdName">Product SRC:</label>
                    <input type="text" name={`ProdName`} onChange={(e) => setImageSrc(e.target.value)} placeholder={`Place Image Link`} />
                </div>
                <button type="submit"
                onClick={fetchProducts}>Submit</button>
            </div>

        </div>
        </form>
    )
}