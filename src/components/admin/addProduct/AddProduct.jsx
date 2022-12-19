import React, { useState } from "react";
import styles from "./addProduct.module.scss";
import { Card, Loader } from "../../index";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

//categories to be provided as options in select input field
const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  description: "",
};

export const AddProduct = () => {
  //access params id
  const { id } = useParams();
  //access product from redux store
  const { products } = useSelector((store) => store["product"]);
  //find product whose id = params id
  const productEdit = products.find((item) => item.id === id);

  //MAKE INPUT FORM DYNAMIC BASED PARAMS
  const detectForm = (id, f1, f2) => {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  };

  //dynamic state
  //--------if id=ADD, state is initialstate, else state is product edit---------------
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //update state
    setProduct({ ...product, [name]: value });
  };

  //UPLOAD IMAGE TO FIREBASE STORAGE
  const handleImageChange = (e) => {
    //access the file being uploaded
    const file = e.target.files[0];
    //store the file in the images folder in firebase storage
    const storageRef = ref(storage, `e-shop/${Date.now()}${file.name}`);
    //upload task to firebase
    const uploadTask = uploadBytesResumable(storageRef, file);

    //monitor upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.trunc(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // get the image url
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded succesfully");
        });
      }
    );
  };

  //------------UPLOAD PRODUCTS TO FIRESTORE---------------
  const { name, imageURL, category, brand, description } = product;
  // convert price to NUM type
  const price = +product.price;

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
    setIsLoading(true);
    try {
      //create new product
      addDoc(collection(db, "products"), {
        name,
        imageURL,
        price,
        category,
        brand,
        description,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success("Product uploaded succesfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  //---------EDIT PRODUCT---------
  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    //delete previous image before providing a new image
    if (imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      //update product
      setDoc(doc(db, "products", id), {
        name,
        imageURL,
        price,
        category,
        brand,
        description,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Edited succesfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h1>{detectForm(id, "Add New Product", "EditProduct")}</h1>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            {/* Product name */}
            <label>Product name:</label>
            <input
              type="text"
              placeholder="Product name"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />

            {/* product image */}
            <label>Product image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress !== 0 && (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="product image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {product.imageURL !== "" && (
                <input
                  type="text"
                  required
                  placeholder="image URL"
                  name="imageURL"
                  value={product.imageURL}
                  disabled
                />
              )}
            </Card>

            {/* product price */}
            <label>Product price:</label>
            <input
              type="number"
              placeholder="Product price"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />

            {/* product category */}
            <label>Product category:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose product category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            {/* product brand */}
            <label>Product Company/Brand:</label>
            <input
              type="text"
              placeholder="Product name"
              required
              name="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />

            {/* product description */}
            <label>Product description:</label>
            <textarea
              type="text"
              name="description"
              value={product.description}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>

            <button className="--btn --btn-primary">
              {detectForm(id, "Save Product", "Edit product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};
