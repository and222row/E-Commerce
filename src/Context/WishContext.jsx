import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export let WishContext = createContext();
export default function WishContextProvider(props) {
  const [noOfWishItems, setNoOfWishItems] = useState(0);
  const [wishDetails, setWishDetails] = useState([]);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function getLoggedUserWich() {
    if (localStorage.getItem("itemWished")) {
      return axios
        .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
          headers,
        })
        .then((response) => {
          console.log(response, "get items wished");
          //setNoOfWishItems(response.data.numOfCartItems);
          setWishDetails(response?.data?.data);
          console.log(wishDetails, "wish details");
          return response;
        })
        .catch((error) => {
          console.log(error, "error from item wished");
          return error;
        });
    } else {
      return;
    }
  }
  function addProductToWish(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response, "added item to wish");

        localStorage.setItem("itemWished", "added");
        localStorage.setItem(productId, productId);

        console.log(localStorage.getItem(productId));
        setWishDetails(response.data.data);
        //setNoOfCartItems(response.data.numOfCartItems);
        toast.success(response.data.message);
        return response;
      })
      .catch((error) => {
        console.log(error, "error from add item to wish");
        toast.error(error.data.message);
        return error;
      });
  }
  function deleteProductWish(productId) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

        {
          headers,
        }
      )
      .then((response) => {
        console.log(response, "removed from wish");
        localStorage.removeItem(productId);
        toast.success(response.data.message);
        //setNoOfCartItems(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        console.log(error, "error from remove from wish");
        toast.error(error.data.message);
        return error;
      });
  }
  return (
    <WishContext.Provider
      value={{
        getLoggedUserWich,
        addProductToWish,
        deleteProductWish,
        noOfWishItems,
        wishDetails,
        setWishDetails,
        setNoOfWishItems,
      }}
    >
      {props.children}
    </WishContext.Provider>
  );
}
