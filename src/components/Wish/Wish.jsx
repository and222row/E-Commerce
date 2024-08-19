import React, { useContext, useEffect, useState } from "react";
import Style from "./Wish.module.css";
import { Link } from "react-router-dom";
import { WishContext } from "../../Context/WishContext";
import Loader from "../Loader/Loader";

export default function Wish() {
  const [loading, setLoading] = useState(false);
  let {
    getLoggedUserWich,
    addProductToWish,
    deleteProductWish,
    noOfWishItems,
    wishDetails,
    setWishDetails,
    setNoOfWishItems,
  } = useContext(WishContext);

  async function deleteWishItem(productId) {
    setLoading(true);
    let response = await deleteProductWish(productId);
    console.log(response.data?.data);
    setLoading(false);
    getWishItems();
  }
  async function getWishItems() {
    setLoading(true);
    if (localStorage.getItem("itemWished")) {
      let response = await getLoggedUserWich();
      console.log(response);
      if (response.data.status != "success") {
        setLoading(false);
        return;
      } else {
        setWishDetails(response?.data?.data);
        setLoading(false);
      }
    } else {
      setWishDetails(null);
    }
    //console.log(wishDetails, "wish list details");
  }
  useEffect(() => {
    getWishItems();
    console.log(wishDetails);
  }, []);
  return (
    <>
      <h2 className=" text-center text-lg font-bold my-16">
        Whish List <i className="fa-solid fa-cart-plus fa-2xl"></i>
      </h2>
      {loading ? (
        <Loader />
      ) : wishDetails?.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:mb-20">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishDetails?.map((item) => (
                <tr
                  key={item?.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={item?.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={item?.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item?.title}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item?.price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => deleteWishItem(item.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className=" flex justify-center items-center min-h-80">
          <p className="text-lg font-medium md:my-80 lg:my-0">
            wish List is empty
          </p>
        </div>
      )}
      {wishDetails.length == 1 ? (
        <div className="md:mb-72 md:h-2 lg:mb-0 lg:h-0"></div>
      ) : (
        ""
      )}
    </>
  );
}
