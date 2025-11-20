"use client"
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth, db} from "@/lib/firebase/firebase";
import {setUser} from "@/features/userSlice";
import {doc, getDoc, getDocs} from "firebase/firestore";
import {useRouter, useSearchParams} from "next/navigation";
import {setLogin} from "@/features/userSlice";
import Link from "next/link";
import {LoadCart} from "@/lib/firebase/loadCart";
import {enableCartSync, disableCartSync} from "@/lib/firebase/syncCart";

export default function AccountManagement() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(null);
    const router = useRouter();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";

    async function HandleLogin() {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const useDocRef = doc(db, "users", user.uid);
            const snapshot = await getDoc(useDocRef);
            let firstname = "";
            let lastname = "";
            if (snapshot.exists()) {
                firstname = snapshot.data().firstname || "";
                lastname = snapshot.data().lastname || "";
            }

            dispatch(setUser({
                uid: user.uid, email: user.email, name: {firstname: firstname, lastname: lastname},
            }))
            setError("");
            console.log("Signed in:", user.email);
            disableCartSync();
            await LoadCart(user.uid, dispatch)
            enableCartSync();
            router.push(redirect);
            dispatch(setLogin(true));
        } catch (err) {
            if (err.code === "auth/invalid-email" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
                setError("Invalid email or password.");
            } else {
                setError("Login failed. Please try again.");
            }
            dispatch(setLogin(false));
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className={`flex justify-center font-sf gap-5 min-h-screen`}>
            <div>
                <h2 className={`text-center text-[40px] font-bold`}>Login</h2>
                <div>
                    <input type="email" placeholder={`Email`} className={`w-[450px] h-12 px-10`}
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}/>
                    <hr/>
                </div>
                <div className={`relative`}>
                    <input type={`password`} placeholder={`Password`} className={`w-[450px] h-12 px-10`}
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}/>
                    <hr/>
                </div>
                <h3 className={`text-[16px] leading-[29px] cursor-pointer`}>FORGOT YOUR PASSWORD?</h3>
                {error && <p className="text-red-500 mt-3">{error}</p>}
                {Loading && <p className="text-blue-500 mt-3">Logging in...</p>}
                <div className={`flex flex-col items-center gap-3 mt-10`}>
                    <button className={`text-[15px] bg-black px-10 py-2 text-white leading-[18px] cursor-pointer`}
                            onClick={HandleLogin}>Sign
                        in
                    </button>
                    <Link href={`/account/register`}>
                        <div className={`text-[15px] leading-[29px] cursor-pointer`}>Create Account</div>
                    </Link>
                </div>
            </div>


        </div>
    )
}