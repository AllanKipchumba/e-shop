import styles from "./productDetails.module.scss";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import { Loader } from "../../loader/Loader";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  //get product from firestore
  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //add an id property to docSnap
      const obj = {
        id,
        ...docSnap.data(),
      };
      setProduct(obj);
      // console.log(product);
    } else {
      toast.error("No document");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="#/products">&larr; Back To Products</Link>
        </div>

        {product === null ? (
          <Loader />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{product.price}</p>
                <p>{product.description}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>SKU</b> {product.brand}
                </p>

                <div className={styles.count}>
                  <button className="--btn">-</button>
                  <p>
                    <b>1</b>
                  </p>
                  <button className="--btn">+</button>
                </div>
                <button className="--btn --btn-danger">ADD TO CART</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
