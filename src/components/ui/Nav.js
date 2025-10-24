import {motion, AnimatePresence} from "framer-motion";
import {RxCross2 as Cross} from "react-icons/rx";
import Image from 'next/image';
import {useState} from "react";
import Link from "next/link";
import {useSelector} from "react-redux";
export default function Nav({setShowNav, showNav}) {
    const [selectedCategory, setSelectedCategory] = useState("MEN");
    const[category, setCategory] = useState("");
    const darkmode=useSelector((state) => state.ui.darkmode);
    function ToggleNav() {
        if(selectedCategory === "MEN"){
            return <div className={`flex flex-col gap-5 font-sf`}>
                <Link href={`/catalog/polo`} onClick={()=>{
                    setCategory("POLO")
                    setShowNav(false);
                }}
                     className={`cursor-pointer hover:font-bold`}
                >POLO</Link>
                <Link href={`/catalog/casual`}
                    onClick={()=>{
                        setCategory("CASUAL")
                        setShowNav(false);
                    }}
                    className={`cursor-pointer hover:font-bold`}>CASUAL</Link>
                <Link href={`/catalog/shirts`}
                    onClick={()=>{
                        setCategory("SHIRTS")
                        setShowNav(false);
                    }}
                    className={`cursor-pointer hover:font-bold`}>SHIRTS</Link>
                <Link href={`/catalog/outerwear`}
                    onClick={()=>{
                        setCategory("OUTERWEAR")
                        setShowNav(false);
                    }}
                    className={`cursor-pointer hover:font-bold`}>OUTERWEAR</Link>
                <Link href={`/catalog/jeans`}
                    onClick={()=>{
                        setCategory("JEANS")
                        setShowNav(false);
                    }}
                    className={`cursor-pointer hover:font-bold`}>JEANS</Link>
            </div>
        }
        else if(selectedCategory==="WOMEN"){
            return <div>WOMAN</div>
        }
        else if(selectedCategory === "JUNIORS"){
            return <div>JUNIORS</div>
        }
    }
    return (
        <>
            <div
                className="fixed inset-0 backdrop-blur-xs bg-black/10 z-10"
                onClick={() => setShowNav(false)}
            ></div>
            <motion.div
                className={`${darkmode?"bg-[#121212]":"bg-white"} fixed w-[500px] left-0 top-0 h-full overflow-y-auto z-20 shadow-lg`}
                initial={{x: "-100%"}}
                animate={{x: 0}}
                exit={{x: "-100%"}}
                transition={{type: "tween", duration: 0.6, ease: "easeInOut"}}>
                <div className={`pl-13 flex flex-col gap-9`}>
                    <div className={`flex flex-row gap-3 items-center`}>
                        <Cross className={`w-10 h-6 cursor-pointer`}
                               onClick={() => {
                                   setShowNav(false);
                               }}></Cross>
                        <Image src={`/${darkmode?"U1.png":"U2.png"}`} width={120} height={80} alt={`logo.png`}></Image>
                    </div>
                    <div className={`flex flex-row gap-16 justify-center font-sf`}>
                        <div className={`cursor-pointer ${selectedCategory==="MEN"?"font-bold":""}`}
                             onClick={() => {
                                 setSelectedCategory("MEN")
                             }}>MEN
                        </div>
                        <div className={`cursor-pointer ${selectedCategory==="WOMEN"?"font-bold":""}`}
                             onClick={() => {
                                 setSelectedCategory("WOMEN")
                             }}>WOMEN
                        </div>
                        <div className={`cursor-pointer ${selectedCategory==="JUNIORS"?"font-bold":""}`}
                             onClick={() => {
                                 setSelectedCategory("JUNIORS")
                             }}>JUNIORS
                        </div>
                    </div>
                    <hr className={`h-0.5 -mt-7 text-gray-400`}/>
                    <ToggleNav></ToggleNav>
                </div>
            </motion.div>

        </>
    )
}