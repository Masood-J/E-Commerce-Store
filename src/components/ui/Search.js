import {getDocs, collection} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase"
import {Search as SR} from "lucide-react"
import {useEffect, useState} from "react";
import Fuse from "fuse.js";
import Image from "next/image";
import Link from "next/link";
import {useSelector} from "react-redux";

export async function fetchAllProducts() {
    const categories = ["polo", "outerwear", "casual", "jeans", "shirts"];

    let allProducts = [];


    for (const cat of categories) {
        const querySnapshot = await getDocs(collection(db, "product", "catalog", cat));
        const items = querySnapshot.docs.map(doc => ({
            id: doc.id,
            category: cat,
            ...doc.data(),
        }));
        allProducts = [...allProducts, ...items];
    }

    return allProducts;
}

export default function Search(props) {
    const [searchedResults, setSearchResults] = useState([]);
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [searchToggle, setToggle] = useState(false);
    const [isbarActive, setBarActive] = useState(false);
    useEffect(() => {
        async function loadProducts() {
            const all = await fetchAllProducts();
            setProducts(all);
            setSearchResults(all); // initialize search results
        }

        loadProducts();
    }, []);

    useEffect(() => {
        if (query) {
            setSearchResults(products);

            const fuse = new Fuse(products, {
                keys: ["name", "category", "image", "price", "id"],
                threshold: 0.2,
            });
            const results = fuse.search(query).map(result => result.item);
            setSearchResults(results);
        }

    }, [query, products]);

    const QueryRes = () => {
        if (query) {
            return <div className={`px-10 pt-4 grid grid-cols-4 gap-2 place-items-center font-sf pb-2`}>
                {searchedResults.map(product => <Link href={`/catalog/${product.category.toLowerCase()}/${product.id}`}
                                                      onClick={()=>{
                                                          setToggle(false);
                                                          setQuery("")
                                                      }}
                                                      key={product.id} className={`hover:bg-[#efefef] rounded-md px-8`}>

                    <div className="w-[150px] h-[250px] overflow-hidden rounded-md">
                        <Image
                            src={product.image.trimStart()}
                            alt="product_img"
                            width={150}
                            height={150}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <h6 className={`text-center text-[11px] text-gray-500 mt-1`}>MEN</h6>
                    <h2 className={`text-center text-gray-700 text-nowrap`}>{product.name}</h2>
                    <h3 className={`text-center font-semibold`}>$ {product.price}</h3>

                </Link>)}
            </div>;
        } else {
            return <div className={`pl-4 pt-4 pr-4`}>
                <h3 className={`font-semibold text-gray-600 text-[13px]`}>PRODUCTS</h3>
                <hr className={`h-0.5 mt-1.5 text-gray-300`}/>
                <div className={`mt-6 text-[15px] text-gray-600`}>
                    Start typing for search results
                </div>
            </div>;
        }
    };
    const darkmode=useSelector((state) => state.ui.darkMode);
    return (
        <div className={``}>
            <SR className={`w-4.5 h-4.5 cursor-pointer`}
                onClick={() => {
                    setToggle(true);
                }}></SR>
            {searchToggle &&
                <div>
                    <div className={`fixed inset-0 backdrop-blur-xs bg-black/10 z-10`}
                         onClick={() => {
                             setToggle(false)
                             setBarActive(false);
                         }}>
                    </div>
                    <div className={`z-12 fixed top-0 left-1/2 -translate-x-1/2 translate-y-8 w-[60vw] `}>
                        <div
                            className={` ${darkmode?"bg-[#1E1E1E]":"bg-white"} rounded-full h-10 flex justify-center z-12 group focus-within:border-1 `}>
                            <input type="text" className={`w-[60vw] placeholder px-4 outline-0 ${darkmode?"":"text-black"}`}
                                   placeholder={`Search`}
                                   value={query} onChange={(e) => setQuery(e.target.value)}
                                   onClick={() => {
                                       setBarActive(true);
                                   }}/>
                        </div>
                        {isbarActive &&
                            <div className={`bg-white mt-2 rounded-md h-97 font-sf overflow-y-auto`}>

                                <QueryRes></QueryRes>
                            </div>}

                    </div>
                </div>}

        </div>
    )
}