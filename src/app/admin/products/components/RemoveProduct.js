"use client";
import {db} from "@/lib/firebase/firebase"
import {doc, deleteDoc, collection} from "firebase/firestore";
import {useState} from "react";

export default function RemoveProduct({onCancel, product,onProdDelete}) {

const [loading,setLoading]=useState(false);
    const deleteProduct=async(productId)=>{
        try{
            const category=product.category.toLowerCase();
            setLoading(true);
            const delRef=doc(db,"product","catalog",`${category}`,productId);
            await deleteDoc(delRef);
            onProdDelete(product)
        }
        catch (err){
            console.log(err)
        }
        finally {
            setLoading(false);
        }
    }

    return (


        <div className={`flex flex-col gap-2 `}>
            <h2>Are you sure, you wish to remove the product?</h2>
            <div className={`flex flex-row justify-between gap-2`}>
                <button
                    className={`border-1 border-gray-200 flex-1 text-center rounded-md p-1 cursor-pointer hover:bg-gray-100`}
                    onClick={onCancel}>Cancel
                </button>
                <button
                    className={`text-white bg-red-500 flex-1 text-center rounded-md cursor-pointer hover:bg-red-600`}
                onClick={()=>{
                    deleteProduct(product.id)
                    onCancel()
                }}>
                    {loading?"Deleting...":"Remove"}
                </button>
            </div>

        </div>


    )
}