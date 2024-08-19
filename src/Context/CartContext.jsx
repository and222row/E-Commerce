import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function getLoggedUserCart() {
    if (localStorage.getItem("itemAdded")) {
      return axios
        .get("https://ecommerce.routemisr.com/api/v1/cart", {
          headers,
        })
        .then((response) => {
          setNoOfCartItems(response.data.numOfCartItems);
          return response;
        })
        .catch((error) => {
          console.log(error, "error");
          setCartDetails([]);
          return error;
        });
    } else {
      return;
    }
  }

  function addProductToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("itemAdded", "added");
        setNoOfCartItems(response.data.numOfCartItems);
        toast.success(response.data.message);
        return response;
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data.message);
        return error;
      });
  }
  function updateCartItemCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        toast.success();
        return response;
      })
      .catch((error) => {
        console.log(error);

        return error;
      });
  }

  function deleteProductItem(productId) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        setNoOfCartItems(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data.message);
        return error;
      });
  }
  function clearCart() {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/`,

        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        //toast.success(response.data.message);
        setNoOfCartItems(0);
        localStorage.removeItem("itemAdded");
        return response;
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data.message);
        return error;
      });
  }
  return (
    <CartContext.Provider
      value={{
        getLoggedUserCart,
        addProductToCart,
        updateCartItemCount,
        deleteProductItem,
        clearCart,
        noOfCartItems,
        cartDetails,
        setCartDetails,
        setNoOfCartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
