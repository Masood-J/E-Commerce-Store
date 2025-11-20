"use client";
import {db} from "@/lib/firebase/firebase"
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {Input, Select} from 'antd';
import {Eye, SquarePen} from "lucide-react";
import {useEffect, useState} from "react";
import EditOrder from "@/app/admin/orders/components/EditOrder";
import ShowCart from "@/app/admin/orders/components/ShowCart";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [showCart, setShowCart] = useState(null);
    const options = [
        {value: 'all', label: "All Status"},
        {
            value: 'failed', label: 'Failed',
        },
        {value: 'completed', label: "Completed"},
        {value: 'pending', label: "Pending"},
        {value: 'returned', label: "Returned"},
    ]
    useEffect(() => {
        async function fetchOrders() {
            setLoading(true);
            try {
                const ordersCol = collection(db, "orders");
                const snapshot = await getDocs(ordersCol);
                const ordersData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(ordersData);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);
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
                        <thead className="bg-gray-50 border-b border-gray-300">
                        <tr>
                            <th className="py-3 px-2 text-left text-sm font-semibold text-gray-700">Order ID</th>
                            <th className="py-3 px-2 text-left text-sm font-semibold text-gray-700">Customer</th>
                            <th className="py-3 px-2 text-left text-sm font-semibold text-gray-700">Date</th>
                            <th className="py-3 px-2 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="py-3 px-2 text-left text-sm font-semibold text-gray-700">Items</th>
                            <th className="py-3 px-2 text-left text-sm font-semibold text-gray-700">Total</th>
                            <th className="py-3 px-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="border-t border-gray-300">
                        {!loading && orders.length > 0 &&
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    {/* Order ID */}
                                    <td className="py-3 px-2 font-mono text-sm text-gray-700">{order.orderId}</td>

                                    {/* Customer */}
                                    <td className="py-3 px-2">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-medium text-gray-900">{order.name}</span>
                                            <span className="text-gray-500 text-xs">{order.email || "—"}</span>
                                        </div>
                                    </td>

                                    {/* Date */}
                                    <td className="py-3 px-2 text-gray-700 text-sm">{order.orderDate}</td>

                                    {/* Status */}
                                    <td className="py-3 px-2">
          <span className={`capitalize px-2 py-1 rounded-full text-xs font-semibold 
            ${order.status === "completed" ? "bg-green-100 text-green-800" :
              order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                  order.status === "failed" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"}`}>
            {order.status}
          </span>
                                    </td>

                                    {/* Items */}
                                    <td className="py-3 px-2 text-gray-700 text-sm">{order.cart?.length || 0} items</td>

                                    {/* Total */}
                                    <td className="py-3 px-2 text-gray-900 font-medium">${order.total}</td>

                                    {/* Actions */}
                                    <td className="py-3 px-2">
                                        <div className="flex flex-row gap-3">
                                            <Eye className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black"
                                            onClick={()=>{
                                                setShowCart(order);
                                            }}/>
                                            <SquarePen className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black"
                                                       onClick={() => {
                                                           setEditProduct(order)
                                                       }}/>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>

                    </table>
                </div>
            </div>
            {editProduct && <div>
                <div className={`fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-20`}>
                    <div className={` bg-white rounded-lg shadow-lg p-5 `}>
                        <EditOrder order={editProduct} onCancel={() => {
                            setEditProduct(null);
                        }}
                                   onStatusChange={(orderId, newStatus) => {

                                       setOrders(prev =>
                                           prev.map(o => o.id === orderId ? {...o, status: newStatus} : o)
                                       );
                                   }}></EditOrder>
                    </div>
                </div>
            </div>}
            {showCart && <div>
                <div className={`fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-20`}>
                    <div className={` bg-white rounded-lg shadow-lg p-5 `}>
                        <ShowCart order={showCart} onCancel={() => {
                            setShowCart(null);
                        }}
                        ></ShowCart>
                    </div>
                </div>
            </div>}

        </div>
    )
}