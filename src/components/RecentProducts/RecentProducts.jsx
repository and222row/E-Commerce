import React, { useContext, useEffect, useState } from "react";
import Style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/WishContext";

export default function RecentProducts() {
  let { data, isError, error, isLoading, isFetching } = useProducts();

  const [loading, setLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = data?.slice(startIndex, startIndex + itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;

  let { addProductToCart } = useContext(CartContext);
  let {
    addProductToWish,
    wishDetails,
    deleteProductWish,
    getLoggedUserWich,
    setWishDetails,
  } = useContext(WishContext);
  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    // Calculate the maximum page number based on your data
    const maxPage = Math.ceil(data?.length / itemsPerPage);

    // Increment the page only if it's not the last page
    if (currentPage < maxPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  function check(productId) {
    //setWishLoading(true);
    console.log(wishLoading);
    if (wishDetails.length < 1) {
      console.log("wish < 1");
      addToWish(productId);
    } else if (localStorage.getItem(productId)) {
      deleteFromWish(productId);
    } else {
      addToWish(productId);
    }
  }
  async function deleteFromWish(productId) {
    setCurrentProductId(productId);
    setWishLoading(true);
    for (let i = 0; i < wishDetails.length; i++) {
      console.log(wishLoading);
      if (wishDetails[i].id == productId) {
        let response = await deleteProductWish(productId);
        setWishLoading(false);
        localStorage.removeItem(productId);
        getWishItems();
        console.log("deleted item");
        return;
      }
    }
  }
  async function addToWish(productId) {
    setCurrentProductId(productId);
    setWishLoading(true);
    let response = await addProductToWish(productId);
    if (response.data.status == "success") {
      setWishLoading(false);
      getWishItems();
    } else {
      setWishLoading(false);
    }
    console.log(response);
  }
  async function getWishItems() {
    if (localStorage.getItem("itemWished")) {
      let response = await getLoggedUserWich();
      console.log(response);
      if (response.data.status != "success") {
        return;
      } else {
        setWishDetails(response?.data?.data);
      }
    } else {
      setWishDetails(null);
    }
    //console.log(wishDetails, "wish list details");
  }

  async function addProduct(productId) {
    setCurrentProductId(productId);
    setLoading(true);
    let response = await addProductToCart(productId);
    if (response.data.status == "success") {
      setLoading(false);
    } else {
      setLoading(false);
    }
    console.log(response);
  }

  useEffect(() => {
    getWishItems();
  }, []);
  return (
    <>
      <div className=" py-6">
        <h2 className=" text-center text-2xl mt-5 font-extrabold">
          Shop Popular Products
        </h2>
        <div className="w-[100px] h-[5px] bg-green-600 mx-auto my-9"></div>
        <div className="row">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div className=" py-8 w-full flex flex-col md:flex-row justify-center">
              <p>{error}</p>
            </div>
          ) : (
            visibleItems?.map((product) => (
              <div key={product.id} className="md:w-1/3 lg:w-1/6 p-3">
                <div className="product overflow-hidden">
                  <Link
                    to={`/productDetails/${product.id}/${product.category.name}`}
                  >
                    <img
                      className=" w-full"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <span className=" block font-light text-green-600">
                      {product.category.name}
                    </span>
                    <h3 className=" text-lg font-normal text-gray-800 mb-4">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                  </Link>
                  <div className=" flex justify-between items-center">
                    <span>{product.price} $</span>

                    <div
                      onClick={() => check(product.id)}
                      className=" cursor-pointer"
                    >
                      {currentProductId == product.id && wishLoading ? (
                        <i className=" fas fa-spinner fa-spin"></i>
                      ) : localStorage.getItem(product.id) ? (
                        <i className="fa-solid fa-heart text-red-500"></i>
                      ) : (
                        <i className="fa-solid fa-heart text-gray-400"></i>
                      )}
                    </div>
                    <span>
                      {product.ratingsAverage}
                      <i className="fas fa-star text-yellow-400"></i>
                    </span>
                  </div>
                  <button
                    onClick={() => addProduct(product.id)}
                    className="btn"
                  >
                    {currentProductId == product.id && loading ? (
                      <i className=" fas fa-spinner fa-spin"></i>
                    ) : (
                      "add to cart"
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <nav aria-label="Page navigation example" className=" text-center">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <button
                onClick={handlePreviousClick}
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Prev.
              </button>
            </li>

            <li>
              <button
                onClick={handleNextClick}
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
