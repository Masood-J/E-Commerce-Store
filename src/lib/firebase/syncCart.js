import {useEffect} from "react";
import {useSelector} from "react-redux";
import {doc, updateDoc, setDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase";

let allowSync = true;

export const disableCartSync = () => {
    allowSync = false;
};
export const enableCartSync = () => {
    allowSync = true;
};

export function SyncCart() {
    const cartItems = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.auth.user);
    const loggedIn = useSelector((state) => state.auth.loggedIn);

    useEffect(() => {
        if (!allowSync) return;
        if (!loggedIn || !user?.uid) return;

        const userRef = doc(db, "users", user.uid);

        const updateFirestore = async () => {
            try {
                if (!cartItems || cartItems.length === 0) return;
                await updateDoc(userRef, {cart: cartItems});
            } catch (err) {
                if (err.code === "not-found") {
                    await setDoc(userRef, {cart: cartItems}, {merge: true});
                } else {
                    console.error("Cart sync failed:", err);
                }
            }
        };

        updateFirestore();
    }, [cartItems, loggedIn, user]);
}
