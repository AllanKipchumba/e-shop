import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./viewProducts.module.scss";
import {
  // collection,
  deleteDoc,
  doc,
  // onSnapshot,
  // orderBy,
  // query,
} from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Loader, Search } from "../../index";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlice";
import { useFetchCollection } from "../../../customHooks/useFetchCollection";
import { FILTER_BY_SEARCH } from "../../../redux/slice/filterSlice";
import { Pagination } from "../../pagination/Pagination";

const { log } = console;

export const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  //access products from firestore using useFetchCollection customhook
  const { data, isLoading } = useFetchCollection("products");

  //access products from redux store
  const { products } = useSelector((store) => store["product"]);
  const { filteredProducts } = useSelector((store) => store["filter"]);

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, ] = useState(10);

  //get current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  //Return a subarray of elements from the filtered products array, starting at the firstProductIndex and ending at (and not including) the lastProductIndex
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //dispatch products to redux
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  //filter products by search
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  //DELETE PRODUCT
  const deleteProduct = async (id, imageURL) => {
    try {
      //delete product from firestore
      await deleteDoc(doc(db, "products", id));
      //delete image from firebase storage
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product deleted succesfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  //confirm delete with notiflix
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        log("delete canceled");
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>

        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filteredProducts.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className="icon">
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </>
  );
};
