import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase";
import { setUser, clearUser, setLogin } from "@/features/userSlice";
import { doc, getDoc } from "firebase/firestore";



export const authListener = (dispatch) => {
    onAuthStateChanged(auth,async (user) => {
        if (user) {
            const userDoc=await getDoc(doc(db,"users",user.uid));
            const name=userDoc.exists()?userDoc.data().name:"";
            dispatch(setUser({
                name:name,
                email:user.email,
                uid:user.uid,
            }));
            dispatch(setLogin({}))
        }
        else{
            dispatch(clearUser());
        }
    })
}