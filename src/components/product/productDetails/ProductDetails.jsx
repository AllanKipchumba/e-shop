import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/config";
import styles from "./productDetails.module.scss";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  //get product from firestore
  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
    } else {
      console.log("no document");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return <div>ProductDetails</div>;
};
