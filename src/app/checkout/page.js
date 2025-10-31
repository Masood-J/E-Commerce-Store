"use client";
import CheckoutForm from "@/components/ui/CheckoutForm";

export default function CheckoutPage() {

    return(
<div>
    <hr className={`border-0 h-[1px] bg-gray-300 -mt-4`}/>
        <div className={`grid grid-cols-[250px_1.5fr_1.5fr_1fr] font-inter gap-8`}>

            <div className={`col-start-2 pt-5`}>
<CheckoutForm></CheckoutForm>
            </div>
            <div className={`col-start-3 col-span-2 bg-[#f5f5f5] pt-5`}>

            </div>

        </div>
</div>
    )
}