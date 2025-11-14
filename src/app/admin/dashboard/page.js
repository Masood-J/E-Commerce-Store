import {TrendingUp, ShoppingBag, Users, Package, TriangleAlert} from "lucide-react";
import DashBox from "@/app/admin/dashboard/components/DashBox";
import SimpleChart from "@/app/admin/dashboard/components/SimpleChart";
import ListElement from "@/app/admin/dashboard/components/ListElement";
import StockAlert from "@/app/admin/dashboard/components/StockAlert";

export default function DashboardPage() {

    return (
        <div className={`grid grid-cols-4 mx-6 gap-y-5 pb-10`}>
            <DashBox icon={<TrendingUp className={`w-4.5 h-4.5`}></TrendingUp>} analytic={`+12% from last month`}
                     title={`Total Revenue`} data={`$34,500`}></DashBox>
            <DashBox icon={<ShoppingBag className={`w-4.5 h-4.5`}></ShoppingBag>} analytic={`+8% from last month`}
                     title={`Total Orders`} data={`1,234`}></DashBox>
            <DashBox icon={<Users className={`w-4.5 h-4.5`}></Users>} analytic={`+23% from last month`}
                     title={`New Customers`} data={`156`}></DashBox>
            <DashBox icon={<Package className={`w-4.5 h-4.5`}></Package>} analytic={`4 low stock items`}
                     title={`Products`} data={`89`} alert={true}></DashBox>

            <div className={`mx-5 px-5 py-5 border-1 rounded-2xl border-gray-200 col-span-2`}>
                <h2>Sales Overview</h2>
                <SimpleChart></SimpleChart>
            </div>
            <div className={`col-span-2 px-5 py-5 border-1 rounded-2xl border-gray-200 `}>
                <div className={`flex flex-col gap-4`}>
                    <h2 className={`mt-1.5`}>Best Selling Products</h2>
                    <div>
                        <ul className={`list-disc space-y-4 marker:text-black px-3`}>
                            <ListElement title={`Denim Jacket`} sold={234} left={12}></ListElement>
                            <ListElement title={`Cotton T-Shirt`} sold={198} left={45}></ListElement>
                            <ListElement title={`Leather Boots`} sold={156} left={8}></ListElement>
                            <ListElement title={`Summer Dress`} sold={134} left={23}></ListElement>
                            <ListElement title={`Wool Sweater`} sold={98} left={2}></ListElement>
                        </ul>
                    </div>

                </div>

            </div>
            <div className={`col-span-2 mx-5 px-5 py-5 border-1 rounded-2xl border-gray-200 `}>
                <h2>Orders Summary</h2>
                <div className={`grid grid-cols-2 mt-5 gap-5 text-gray-600`}>
                    <div className={`flex flex-row gap-1 bg-[#f8f5ee] min-h-16 rounded-md`}>
                        <div className={`flex flex-col mx-4 my-3`}><h2>Pending</h2>
                            <h3 className={`font-semibold text-black text-[20px]`}>23</h3>
                        </div>
                    </div>
                    <div className={`flex flex-row gap-1 min-h-16 rounded-md bg-[#f0fdf4]`}>
                        <div className={`flex flex-col mx-4 my-3`}><h2>Completed</h2>
                            <h3 className={`text-[20px] text-green-600 font-semibold`}>1,156</h3>
                        </div>
                    </div>
                    <div className={`flex flex-row gap-1 min-h-16 rounded-md bg-[#fef2f2]`}>
                        <div className={`flex flex-col mx-4 my-3`}><h2>Failed</h2>
                            <h3 className={`text-red-600 font-semibold text-[20px]`}>12</h3>
                        </div>
                    </div>
                    <div className={`flex flex-row gap-1 min-h-16 rounded-md bg-[#fefce8]`}>
                        <div className={`flex flex-col mx-4 my-3`}><h2>Returned</h2>
                            <h3 className={`text-[#d08700] font-semibold text-[20px]`}>43</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`col-span-2 px-5 py-5 border-1 rounded-2xl border-gray-200`}>
                <div className={`flex items-center flex-row gap-2`}><TriangleAlert
                    className={`w-4.5 h-4.5 text-red-600`}></TriangleAlert>
                    Low Stock Alerts
                </div>
                <div className={`flex flex-col gap-2 mt-4`}>
                    <StockAlert name={`Blue Denim Jeans`} left={`2`} category={`Jeans`}></StockAlert>
                    <StockAlert name={`Striped Blue Shirt`} left={`6`} category={`Shirts`}></StockAlert>
                    <StockAlert name={`Red Jacket`} left={`8`} category={`Outerwear`}></StockAlert>
                    <StockAlert name={`Graphic Pink T-Shirt`} left={`10`} category={`Casual`}></StockAlert>

                </div>
            </div>

        </div>
    )
}