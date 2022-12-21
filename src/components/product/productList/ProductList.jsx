import React, { useEffect, useState } from "react";
import styles from "./productList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { Search } from "../../search/Search";
import { ProductItem } from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BY_SEARCH } from "../../../redux/slice/filterSlice";
import { SORT_PRODUCTS } from "../../../redux/slice/filterSlice";
import { Pagination } from "../../pagination/Pagination";

export const ProductList = ({ products }) => {
  //access filtered product from redux store
  const { filteredProducts } = useSelector((store) => store["filter"]);

  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(1);
  //get current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();
  //fire FILTER_BY_SEARCH action
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  //fire SORT_PRODUCTS action
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt
            size={24}
            color="orangered"
            onClick={() => setGrid(false)}
          />
          <p>
            <b>{filteredProducts.length} Products found.</b>
          </p>
        </div>

        {/* search icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* sort products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {filteredProducts.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {filteredProducts.map((product) => {
              return (
                <div key={product.id}>
                  {/* ...product passes all the properties of product to the child component */}
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};
