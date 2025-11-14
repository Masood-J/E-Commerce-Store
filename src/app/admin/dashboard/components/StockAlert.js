export default function StockAlert({left, name, category}) {

    return (
        <div className={`bg-[#fef2f2] flex flex-row justify-between px-3 py-2 rounded-md`}>
            <div className={`flex flex-col gap-2`}>
                <h2>{name}</h2>
                <h3>{category}</h3>
            </div>
            <h2>{left} left</h2>
        </div>
    )
}