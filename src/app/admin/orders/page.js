"use client";
import {db} from "@/lib/firebase/firebase"
import {doc, getDoc} from "firebase/firestore";
import {Input, Select} from 'antd';
import {Eye, SquarePen} from "lucide-react";

export default function orders() {
    const options = [
        {value: 'all', label: "All Status"},
        {
            value: 'failed', label: 'Failed',
        },
        {value: 'completed', label: "Completed"},
        {value: 'pending', label: "Pending"},
        {value: 'returned', label: "Returned"},
    ]
    return (
        <div className={`mx-10 font-inter `}>
            <h2 className={`font-semibold text-2xl`}>Orders Management</h2>
            <div className={`border-1 rounded-md border-gray-200 px-5 py-2`}>
                <div className={`flex flex-row gap-2 mt-5`}>
                    <div className={`min-w-60`}>
                        <Input placeholder={`Search orders,customers...`} onChange={(e) => {
                            const value = e.target.value;
                        }}

                        ></Input>
                    </div>
                    <Select options={options}
                            defaultValue="all"
                            className={`w-40`}

                    ></Select>
                </div>
                <div className={`mt-4`}>
                    <table className={`min-w-full border-gray-300 rounded-md table-auto`}>
                        <thead className={`text-left border-b-1 border-b-gray-300`}>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className={`border-t-1 `}>
                            <td>ORD-001</td>
                            <td>
                                <div className={`flex flex-col gap-1`}>
                                    <h2>Sarah Johnson</h2>
                                    <h4>sarah.j@email.com</h4>
                                </div>
                            </td>
                            <td>Sep 23,2024</td>
                            <td>Pending</td>
                            <td>3 items</td>
                            <td>$156.99</td>
                            <td>
                                <div className={`flex flex-row gap-4`}>
                                    <Eye className={`w-4.5 h-4.5`}></Eye>
                                    <SquarePen className={`w-4.5 h-4.5 `}></SquarePen>
                                </div>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}