import {doc,getDoc,setDoc} from "firebase/firestore";
import {setCart} from "@/features/cartSlice";
import {db} from "@/lib/firebase/firebase";

export async function LoadCart(uid,dispatch){
const userRef=doc(db,"users",uid)
    const snapshot=await getDoc(userRef)

    if(snapshot.exists()){
        const data=snapshot.data();
        const cartItems=data.cart||[];
        dispatch(setCart(cartItems));
    }
}