import {db} from "@/lib/firebase/firebase"
import {doc, getDoc} from "firebase/firestore";
import Image from "next/image";
import ProductClient from "@/components/ui/ProductClient";

export default async function CasualPage({params}) {
    const {id} = params;
    const docRef = doc(db, "product","catalog","casual", id)
    const docSnap = await getDoc(docRef);
    if (!docSnap) {
        return (
            <div className={`flex items-center justify-center`}>Product Does not Exist</div>
        )
    }
    const productData = docSnap.data();
    const product = JSON.parse(
        JSON.stringify({
            ...productData,
        })
    );

    return (
        <ProductClient product={product}></ProductClient>
    )
}