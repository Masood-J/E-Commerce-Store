import {TrendingUp} from "lucide-react";

export default function DashBox({icon,title,data,analytic,alert}){

    return(
        <div className={`px-4 py-3 mx-5 flex flex-col gap-9 border-1 border-gray-300 rounded-2xl font-inter`}>
            <div className={`flex flex-row items-center justify-between text-gray-600 font-medium`}>
                <h2>{title}</h2>
                {icon}
            </div>
            <div>
                <h2 className={`text-2xl font-semibold`}>{data}</h2>
                <p className={`text-gray-500 ${alert?"text-red-500":""}`}>{analytic}</p>
            </div>

        </div>
    )
}