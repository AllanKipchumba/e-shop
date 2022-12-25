import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

export const useFetchDocument = () => {
    const [singleDocument, setSingleDocument] = useState(null);

    const getDocument = async(collectionName, documentID) => {
        const docRef = doc(db, collectionName, documentID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //add an id property to docSnap
            const obj = {
                id: documentID,
                ...docSnap.data(),
            };
            setSingleDocument(obj);
            // console.log(product);
        } else {
            toast.error(`Document not found`);
        }
    };
    useEffect(() => {
        getDocument();
    }, []);

    return singleDocument;
};