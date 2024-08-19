import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
export default function Cart() {
  //const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  let {
    getLoggedUserCart,
    updateCartItemCount,
    deleteProductItem,
    clearCart,
    cartDetails,
    setCartDetails,
  } = useContext(CartContext);
  async function updateCartCount(productId, count) {
    setLoading(true);
    let response = await updateCartItemCount(productId, count);
    console.log(response.data?.data, "see the error");
    setCartDetails(response.data?.data);
    setLoading(false);
  }
  async function deleteItem(productId) {
    setLoading(true);
    let response = await deleteProductItem(productId);
    console.log(response.data?.data);
    setCartDetails(response.data?.data);
    setLoading(false);
  }
  async function clearCartItems() {
    setLoading(true);
    let response = await clearCart();

    setCartDetails(response.data.data);
    setLoading(false);
  }
  async function getCartItems() {
    setLoading(true);
    if (localStorage.getItem("itemAdded")) {
      let response = await getLoggedUserCart();
      console.log(response);
      if (response.message == "Request failed with status code 404") {
        setLoading(false);
        return;
      } else {
        setCartDetails(response.data.data);
        setLoading(false);
      }
    } else {
      setCartDetails(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <h2 className=" text-center text-lg font-bold my-16">
        Cart List <i className="fa-solid fa-cart-plus fa-2xl"></i>
      </h2>
      <div className="row">
        {loading ? (
          <Loader />
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto md:mt-20 lg:mt-0">
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
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {cartDetails?.products.length < 1 || !cartDetails ? (
                  <tr>
                    <td colSpan={7}>
                      <p className=" text-center text-lg font-bold py-4 md:my-52 lg:my-10">
                        Cart still empty
                      </p>
                    </td>
                  </tr>
                ) : (
                  cartDetails?.products.map((product) => (
                    <tr
                      key={product.product.imageCover}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={product.product.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            onClick={() =>
                              product?.count - 1 <= 0
                                ? deleteItem(product?.product?.id)
                                : updateCartCount(
                                    product?.product.id,
                                    product?.count - 1
                                  )
                            }
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span>{product.count}</span>
                          </div>
                          <button
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            onClick={() =>
                              updateCartCount(
                                product.product.id,
                                product.count + 1
                              )
                            }
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} $
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price * product.count} $
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                          onClick={() => deleteItem(product.product.id)}
                        >
                          Remove
                        </span>
                      </td>
                    </tr>
                  ))
                )}

                {cartDetails?.products?.length > 0 ? (
                  <tr>
                    <td></td>
                    <td
                      colSpan={2}
                      className=" text-lg text-gray-950 font-bold py-5"
                    >
                      Total cart price
                    </td>
                    <td className=" text-lg text-gray-950 font-bold">
                      {cartDetails?.totalCartPrice} $
                    </td>
                    <td colSpan={2}>
                      <Link
                        to={`/shippingAddress/${cartDetails?._id}`}
                        className="btn font-bold"
                      >
                        Check out
                      </Link>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {cartDetails?.products?.length > 0 ? (
        <div className="w-1/2 md:w-1/4 mx-auto font-bold my-5">
          <button onClick={() => clearCartItems()} className="btn-red">
            remove all items
          </button>
        </div>
      ) : null}
    </>
  );
}
