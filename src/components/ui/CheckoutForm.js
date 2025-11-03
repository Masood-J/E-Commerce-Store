"use client";
import {useForm, Controller} from "react-hook-form";
import dynamic from "next/dynamic";
import MyInput from "@/components/ui/MyInput";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {auth, db} from "@/lib/firebase/firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {clearUser, setLogin} from "@/features/userSlice";
import {useDispatch} from "react-redux";
import Link from "next/link";
import {doc, serverTimestamp, arrayUnion, updateDoc} from "firebase/firestore";
import {clearCart} from "@/features/cartSlice";
import {useRouter} from "next/navigation";

const Select = dynamic(() => import("react-select"), {ssr: false});

export default function CheckoutForm({onSubmit, cart, finalPrice}) {
    const dispatch = useDispatch();
    const user = auth.currentUser;
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [billingStatus, setBillingStatus] = useState(false);
    const cities = [
        {value: "lhr", label: "Lahore"},
        {value: "krc", label: "Karachi"},
        {value: "fsl", label: "Faisalabad"},
    ];
    const router=useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const [logout, showLogout] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: {
            contact: {Email: "", Phone: ""},
            shipping: {
                FirstName: "",
                LastName: "",
                Address: "",
                City: "",
                Country: "",
                PostalCode: "",
            },
            billing: {
                FirstName: "",
                LastName: "",
                Address: "",
                City: "",
                Country: "",
                PostalCode: "",
            },
            payment: "cod",
            SameAsShipping: true,
        },
    });
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setValue("contact.Email", user.email);
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
                setValue("contact.Email", "");
            }
        });

        return () => unsubscribe();
    }, [setValue]);

    async function handleLogout() {
        try {
            await signOut(auth);
            dispatch(clearUser());
            console.log("User signed out successfully");
            dispatch(setLogin(false));
            reset();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }




    const sameAsShipping = watch("SameAsShipping", true);
    const userEmail = watch("contact.Email");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 pb-5">
            {/* Email */}
            {!loggedIn ? <div>
                <div className={`flex flex-row justify-between items-center`}>
                    <h3 className="font-semibold text-[19px]">Contact</h3>
                    <Link href={`/account/login?redirect=/checkout`} className="underline text-blue-500">
                        Sign In
                    </Link>
                </div>
                <MyInput
                    type="email"
                    {...register("contact.Email", {required: "Email is required"})}
                    placeholder="Email"
                />
                {errors.contact?.Email && (
                    <span className="text-red-500 text-sm">{errors.contact.Email.message}</span>
                )}
            </div> : <div>
                <div className={`flex flex-row justify-between items-center`}>
                    <h3>{userEmail}</h3>
                    <div className={`relative `}>
                        <div className={` text-[14px] text-blue-500 bg-white border-1 p-1 mt-1 rounded-md `}
                             onClick={() => {
                                 handleLogout();
                             }}>
                            <button className={`cursor-pointer`}>Signout</button>
                        </div>
                    </div>
                </div>
                <hr className={`mt-3 border-0 h-[1px] bg-gray-300`}/>
            </div>}


            <h3 className="font-semibold text-[19px]">Delivery</h3>
            <Controller
                name="shipping.City"
                control={control}
                rules={{required: "Please select your city"}}
                render={({field}) => (
                    <Select
                        {...field}
                        options={cities}
                        placeholder="Select your city"
                        onChange={(val) => field.onChange(val)} // pass value to RHF
                        value={field.value}
                    />
                )}
            />
            {errors.shipping?.City && (
                <span className="text-red-500 text-sm">{errors.shipping.City.message}</span>
            )}
            <Controller
                name="shipping.Country"
                control={control}
                rules={{required: "Please select your country"}}
                render={({field}) => (
                    <Select
                        {...field}
                        options={[{value: "pk", label: "Pakistan"}]}
                        placeholder="Select your country"
                        onChange={(val) => field.onChange(val)}
                        value={field.value}
                    />
                )}
            />
            {errors.shipping?.Country && (
                <span className="text-red-500 text-sm">{errors.shipping.Country.message}</span>
            )}

            {/* Shipping Name */}
            <div className="flex flex-row gap-2">
                <div className="flex-1">
                    <MyInput
                        type="text"
                        {...register("shipping.FirstName", {required: "First name required"})}
                        placeholder="First Name"
                    />
                    {errors.shipping?.FirstName && (
                        <span className="text-red-500 text-sm">{errors.shipping.FirstName.message}</span>
                    )}
                </div>

                <div className="flex-1">
                    <MyInput
                        type="text"
                        {...register("shipping.LastName", {required: "Last name required"})}
                        placeholder="Last Name"
                    />
                    {errors.shipping?.LastName && (
                        <span className="text-red-500 text-sm">{errors.shipping.LastName.message}</span>
                    )}
                </div>
            </div>

            {/* Shipping Address */}
            <div className="flex flex-col gap-2">
                <div>
                    <MyInput
                        type="text"
                        {...register("shipping.Address", {required: "Address is required"})}
                        placeholder="Address"
                    />
                    {errors.shipping?.Address && (
                        <span className="text-red-500 text-sm">{errors.shipping.Address.message}</span>
                    )}
                </div>

                <div>
                    <MyInput
                        type="number"
                        {...register("contact.Phone", {required: "Phone number is required"})}
                        placeholder="Phone"
                    />
                    {errors.contact?.Phone && (
                        <span className="text-red-500 text-sm">{errors.contact.Phone.message}</span>
                    )}
                </div>
            </div>

            {/* Payment */}
            <h3 className="font-semibold text-[19px]">Payment</h3>
            <div className="flex flex-col gap-2">
                <div
                    className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${
                        paymentMethod === "cod" ? "border-blue-500" : "border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cod"}
                        onChange={() => {
                            setPaymentMethod("cod");
                            setValue("payment", "cod");
                        }}
                    />
                    <h4>Cash on Delivery (COD)</h4>
                </div>

                <div
                    className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${
                        paymentMethod === "card" ? "border-blue-500" : "border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "card"}
                        onChange={() => {
                            setPaymentMethod("card");
                            setValue("payment", "card");

                        }}
                    />
                    <h4>Debit - Credit Card</h4>
                </div>
            </div>

            {/* Billing */}
            <h3 className="font-semibold text-[19px]">Billing Address</h3>
            <div className="flex flex-col gap-2">
                <div
                    className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${
                        sameAsShipping ? "border-blue-500" : "border-gray-300"
                    }`}
                    onClick={() => setValue("SameAsShipping", true)}
                >
                    <input
                        type="radio"
                        {...register("SameAsShipping")}
                        checked={billingStatus === false}
                        onChange={() => {
                            setValue("SameAsShipping", true)
                            setBillingStatus(false);
                        }}
                    />
                    <h4>Same as shipping address</h4>
                </div>

                <div
                    className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${
                        !sameAsShipping ? "border-blue-500" : "border-gray-300"
                    }`}
                    onClick={() => setValue("SameAsShipping", false)}
                >
                    <input
                        type="radio"
                        {...register("SameAsShipping")}
                        checked={billingStatus === true}
                        onChange={() => {
                            setValue("SameAsShipping", false)
                            setBillingStatus(true);
                        }}
                    />
                    <h4>Use a different billing address</h4>
                </div>

                {!sameAsShipping && (
                    <motion.div
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.3}}
                        className="flex flex-col gap-2 mt-2"
                    >
                        <Select options={[{value: "pk", label: "Pakistan"}]}/>
                        <div className="flex flex-row gap-2">
                            <div className="flex-1">
                                <MyInput
                                    type="text"
                                    {...register("billing.FirstName", {required: "First name required"})}
                                    placeholder="First Name"
                                />
                                {errors.billing?.FirstName && (
                                    <span className="text-red-500 text-sm">{errors.billing.FirstName.message}</span>
                                )}
                            </div>

                            <div className="flex-1">
                                <MyInput
                                    type="text"
                                    {...register("billing.LastName", {required: "Last name required"})}
                                    placeholder="Last Name"
                                />
                                {errors.billing?.LastName && (
                                    <span className="text-red-500 text-sm">{errors.billing.LastName.message}</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <MyInput
                                type="text"
                                {...register("billing.Address", {required: "Address required"})}
                                placeholder="Address"
                            />
                            {errors.billing?.Address && (
                                <span className="text-red-500 text-sm">{errors.billing.Address.message}</span>
                            )}
                        </div>

                        <Controller
                            name="billing.City"
                            control={control}
                            rules={{required: "Please select your city"}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={cities}
                                    placeholder="Select your city"
                                    onChange={(val) => field.onChange(val)} // pass value to RHF
                                    value={field.value}
                                />
                            )}
                        />
                        {errors.billing?.City && (
                            <span className="text-red-500 text-sm">{errors.billing.City.message}</span>
                        )}
                        <MyInput
                            type="number"
                            {...register("billing.Phone")}
                            placeholder="Phone (optional)"
                        />
                    </motion.div>
                )}
            </div>

            <button
                type="submit"
                className="cursor-pointer bg-[#005bd1] p-2 text-white rounded-md font-semibold py-3"
            >
                Complete Order
            </button>
        </form>
    );
}
