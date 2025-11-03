import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "@/lib/firebase/firebase";
import {setUser, clearUser, setLogin} from "@/features/userSlice";
import {doc, getDoc} from "firebase/firestore";

export const authListener = (dispatch) => {

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);

                let firstname = "";
                let lastname = "";

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    firstname = data.firstname || "";
                    lastname = data.lastname || "";
                }

                dispatch(
                    setUser({
                        uid: user.uid,
                        email: user.email,
                        name: {firstname, lastname},
                    })
                );
                dispatch(setLogin(true));
            } catch (error) {
                console.error("Error getting user info:", error);
            }
        } else {
            dispatch(clearUser());
            dispatch(setLogin(false));
        }
    });
};
