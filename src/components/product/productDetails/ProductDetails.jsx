import styles from "./productDetails.module.scss";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import { Loader } from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
} from "../../../redux/slice/cartSlice";
import { useFetchDocument } from "../../../customHooks/useFetchDocument";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  //get a single product from firestore
  const singleDocument = useFetchDocument("products", id);
  console.log(singleDocument);
  useEffect(() => {
    setProduct(singleDocument);
  }, [singleDocument]);

  //get a single product from firestore
  // const getProduct = async () => {
  //   const docRef = doc(db, "products", id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     //add an id property to docSnap
  //     const obj = {
  //       id,
  //       ...docSnap.data(),
  //     };
  //     setProduct(obj);
  //     // console.log(product);
  //   } else {
  //     toast.error("No doc");
  //   }
  // };
  // useEffect(() => {
  //   getProduct();
  // }, []);

  //access cartItems from store
  const { cartItems } = useSelector((store) => store["cart"]);

  //access the product from cartItems
  const cart = cartItems.find((cart) => cart.id === id);

  //check if product is already added to cat
  //the fn returns -1 if not
  const isProductAddedToCart = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  //add roduct to cart
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  //decrease cart quantity
  const decreaseCart = () => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
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
                  {isProductAddedToCart >= 0 && (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>

                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
