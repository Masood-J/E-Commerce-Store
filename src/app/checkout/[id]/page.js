"use client";
import {CircleCheck} from "lucide-react";
import {useRouter} from "next/navigation";
import React,{useEffect} from "react";
import {useDispatch} from "react-redux";
import {clearCart} from "@/features/cartSlice";
export default function Confirmation({ params }) {
    const dispatch = useDispatch();
    const { id } = React.use(params);
    const router=useRouter();
useEffect(() => {
    const timed_redirect=setTimeout(()=>{
router.push('/');
    },5000)
return () => clearTimeout(timed_redirect)
})
    useEffect(()=>{
        dispatch(clearCart());
    },[dispatch])
    return (
        <div className="flex justify-center h-screen">
            <div className="flex flex-col items-center gap-2 text-center">
                <CircleCheck className={`text-green-400 w-10 h-10`}></CircleCheck>
                <h3 className="text-2xl font-semibold">Your Order Has Been Confirmed!</h3>
                <h4 className="text-gray-600">Order Receipt #{id}</h4>
            </div>
        </div>
    );
}
