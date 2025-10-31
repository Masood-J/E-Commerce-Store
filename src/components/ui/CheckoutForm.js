"use client";
import {useForm} from "react-hook-form"
import dynamic from "next/dynamic";
import MyInput from "@/components/ui/MyInput";
import {useState} from "react";
import {motion} from "framer-motion";

const Select = dynamic(() => import("react-select"), {ssr: false});
export default function CheckoutForm({onSubmit}) {
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const cities = [{value: 'lhr', label: 'Lahore'}, {value: 'krc', label: 'Karachi'}, {
        value: 'fsl', label: 'Faisalabad'
    }]
    const {register, handleSubmit, watch, setValue, formState: {errors}} = useForm({
        defaultValues: {
            FirstName: "",
            LastName: "",
            Email: "",
            City: "",
            Country: "",
            Phone: "",
            PostalCode: "",
            Address: "",
            payment: "cod",
            SameAsShipping: true,
        }
    })
    const sameAsShipping = watch("SameAsShipping");
    return (<form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-3 pb-5`}>
        <h3 className={`font-semibold text-[19px]`}>Contact</h3>
        <MyInput type="email" {...register("Email", {required: "Required"})} placeholder={`Email`}/>
        <h3 className={`font-semibold text-[19px]`}>Delivery</h3>
        <Select options={cities}></Select>
        <Select options={[{value: "pk", label: "Pakistan"}]}></Select>
        <div className={`flex flex-row gap-2`}>
            <MyInput type="text" style={`flex-1`} {...register("FirstName", {required: "Required"})}
                     placeholder={`First Name`}/>
            <MyInput type="text" style={`flex-1`} {...register("LastName", {required: "Required"})}
                     placeholder={`Last Name`}/>
        </div>
        <div className={`flex flex-col gap-2`}>
            <MyInput style={`flex-1`} type="text" {...register("Address", {required: "Required"})}
                     placeholder={`Address`}/>
            <MyInput style={`flex-1`} type="number" {...register("Phone", {required: "Required"})}
                     placeholder={`Phone`}/>
        </div>
        <h3 className={`font-semibold text-[19px]`}>Payment</h3>
        <div className={`flex flex-col gap-2`}>
            <div
                className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${paymentMethod === "cod" ? "border-blue-500" : "border-gray-300"}`}
                onClick={() => setPaymentMethod("cod")}>
                <input type="radio" name={`payment`} checked={paymentMethod === "cod"}
                       onChange={() => setPaymentMethod("cod")}/>
                <h4>Cash on Delivery (COD)</h4>
            </div>
            <div className={` flex flex-row items-center`}>
                <div
                    className={`flex flex-1 items-center gap-2 p-2 border rounded cursor-pointer ${paymentMethod === "card" ? "border-blue-500" : "border-gray-300"}`}
                    onClick={() => setPaymentMethod("card")}>
                    <input type="radio" name={`payment`} checked={paymentMethod === "card"}
                           onChange={() => setPaymentMethod("card")}/>
                    <h4>Debit - Credit Card</h4>
                </div>
            </div>
        </div>
        <h3 className={`font-semibold text-[19px]`}>Billing Address</h3>
        <div className="flex flex-col gap-2">
            <div
                className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${sameAsShipping ? "border-blue-500" : "border-gray-300"}`}
                onClick={() => setValue("SameAsShipping", true)}
            >
                <input
                    type="radio"
                    {...register("SameAsShipping")}
                    checked={sameAsShipping === true}
                    onChange={() => setValue("SameAsShipping", true)}
                />
                <h4>Same as shipping address</h4>
            </div>

            <div
                className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${!sameAsShipping ? "border-blue-500" : "border-gray-300"}`}
                onClick={() => setValue("SameAsShipping", false)}
            >
                <input
                    type="radio"
                    {...register("SameAsShipping")}
                    checked={sameAsShipping === false}
                    onChange={() => setValue("SameAsShipping", false)}
                />
                <h4>Use a different billing address</h4>
            </div>
            {!sameAsShipping && (<motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-2 mt-2">
                input details</motion.div>)}
        </div>

        <button type={`submit`} className={`cursor-pointer bg-[#005bd1] p-2 text-white rounded-md font-semibold py-3`}>Complete Order</button>

    </form>)
}