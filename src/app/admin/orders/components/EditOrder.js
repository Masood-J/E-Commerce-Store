"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import { db } from "@/lib/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { DotLoader } from "@/app/admin/products/components/DotLoader";

export default function EditOrder({ order, onCancel,onStatusChange  }) {
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        orderId: "",
        orderDate: "",
        total: "",
        cart: [],
        status: "",
    });

    useEffect(() => {
        if (order) setFormData(order);
    }, [order]);
    useEffect(() => {
        onStatusChange(formData.id,formData.status)
    }, [formData]);


    const handleStatusChange = async (selectedOption) => {
        const newStatus = selectedOption.value;
        setFormData((prev) => ({ ...prev, status: newStatus }));

        try {
            setSaving(true);
            const orderRef = doc(db, "orders", order.id);
            await updateDoc(orderRef, { status: newStatus });
        } catch (err) {
            console.error("Error updating order status:", err);
        } finally {
            setSaving(false);
        }
    };

    const statusOptions = [
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "failed", label: "Failed" },
        { value: "returned", label: "Returned" },
    ];

    return (
        <div className="font-inter w-96">
            <h2 className="font-semibold text-[19px] mb-4">Order Details</h2>

            {/* Grid container for two columns */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-[16px]">Order ID</label>
                    <input
                        type="text"
                        value={formData.orderId}
                        readOnly
                        className="bg-[#f3f3f5] p-2 rounded-md outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[16px]">Customer Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        readOnly
                        className="bg-[#f3f3f5] p-2 rounded-md outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[16px]">Email</label>
                    <input
                        type="text"
                        value={formData.email}
                        readOnly
                        className="bg-[#f3f3f5] p-2 rounded-md outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[16px]">Order Date</label>
                    <input
                        type="text"
                        value={formData.orderDate}
                        readOnly
                        className="bg-[#f3f3f5] p-2 rounded-md outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[16px]">Total ($)</label>
                    <input
                        type="text"
                        value={formData.total}
                        readOnly
                        className="bg-[#f3f3f5] p-2 rounded-md outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[16px]">Status</label>
                    <Select
                        value={statusOptions.find(opt => opt.value === formData.status) || { value: formData.status, label: formData.status }}
                        onChange={handleStatusChange}
                        options={statusOptions}
                        isDisabled={saving}
                    />
                </div>
            </div>

            <div className="flex flex-row gap-3 justify-end pt-4">
                <button
                    className="text-center border border-gray-300 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-all duration-200"
                    onClick={onCancel}
                >
                    Close
                </button>
            </div>

            {saving && (
                <div className="mt-2 flex justify-center">
                    <DotLoader />
                </div>
            )}
        </div>
    );
}
