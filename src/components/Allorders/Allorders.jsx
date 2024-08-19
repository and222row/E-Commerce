import React, { useContext, useEffect } from "react";
import Style from "./Allorders.module.css";
import { CartContext } from "../../Context/CartContext";

export default function Allorders() {
  let { clearCart, setCartDetails, setNoOfCartItems } = useContext(CartContext);
  async function clearCartItems() {
    let response = await clearCart();

    setCartDetails(response.data.data);
  }
  useEffect(() => {
    clearCartItems();
    setNoOfCartItems(0);
  }, []);

  return (
    <>
      <div className=" container mx-auto flex justify-center items-center  min-h-[50vh]">
        <div
          id="alert-additional-content-3"
          className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">
              Payment completed successfully
            </h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
            <p>
              Your payment has been completed successfully. We are now
              processing your order. Please note that it may take up to 3 days
              to process the request.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
