"use client"

import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth,db} from "@/lib/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import {useRouter} from "next/navigation"

export default function AccountRegister(){

const router=useRouter();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleRegister=async()=>{
        setError("")
        setLoading(true)
        try{
            const userCredential=await createUserWithEmailAndPassword(auth,form.email,form.password)
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                firstname: form.firstName,
                lastname: form.lastName,
            });
            console.log("Account created successfully!");
            router.push("/account/login");
        }
        catch(err){
            console.error(err);
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }
    return(
        <div className={`grid justify-center font-sf`}>
            <div className={`grid gap-5`}>
                <h1 className={`justify-self-center text-[40px] font-bold`}>Create Account</h1>
                <div >
                    <input type="text" placeholder={`First Name`} className={`w-[446px] h-[45px] px-5`}
                    value={form.firstName}
                    onChange={(e)=>setForm({...form,firstName:e.target.value})}/>
                    <hr/>
                </div>
                <div>
                    <input type="text" placeholder={`Last Name`} className={`w-[446px] h-[45px] px-5`}
                    value={form.lastName}
                    onChange={(e)=>setForm({...form,lastName:e.target.value})}/>
                    <hr/>
                </div>
                <div>
                    <input type="email" placeholder={`Email`} className={`w-[446px] h-[45px] px-5`}
                    value={form.email}
                    onChange={(e)=>setForm({...form,email:e.target.value})}/>
                    <hr/>
                </div>
                <div>
                    <input type="password" placeholder={`Password`} className={`w-[446px] h-[45px] px-5`}
                    value={form.password}
                    onChange={(e)=>setForm({...form,password:e.target.value})}/>
                    <hr/>
                </div>
                <button className={`justify-self-center bg-black text-white px-6 py-1 cursor-pointer`}
                onClick={handleRegister}> {loading ? "Creating..." : "Create"}</button>
            </div>


        </div>
    )
}