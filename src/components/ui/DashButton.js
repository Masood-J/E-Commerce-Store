
"use client";
import {useRouter} from 'next/navigation';
export default function DashButton({icon,title,link,active}) {
const router=useRouter();



    return(
        <div className={`flex flex-row items-center cursor-pointer gap-3 pl-3 py-2 ml-1 rounded-md   font-inter 
        ${active?"bg-indigo-100 text-indigo-600":"text-gray-800 hover:bg-gray-100 hover:text-gray-900"} transition-colors duration-300 ease-in-out`}
        onClick={()=>router.push(`/admin/${link}`)}>
            {icon}
            <h3 className={`text-sm`}>{title}</h3>
        </div>
    )
}