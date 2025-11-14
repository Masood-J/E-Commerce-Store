export default function ListElement({title, sold, left}) {
    return (

        <li>
            <div className={`flex flex-row justify-between`}>
                <h2>{title}</h2>
                <div className={`flex flex-row gap-2`}>
                    <h2 className={`text-sm`}>{sold} sold</h2> <h2
                    className={`rounded-2xl px-2  text-sm ${left < 11 ? "bg-[#d4183d] text-white" : "bg-[#eceef2]"}`}>{left} left</h2>
                </div>
            </div>
        </li>


    )
}