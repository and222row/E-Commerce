import React, { useContext } from "react";
import Style from "./AddButton.module.css";
import { CartContext } from "../../Context/CartContext";

export default function AddButton(props) {
  let { addProductToCart } = useContext(CartContext);
  async function addProduct(productId) {
    let response = await addProductToCart(productId);
    console.log(response);
  }
  return (
    <>
      <button onClick={() => addProduct(id)} className="btn">
        add to cart
      </button>
    </>
  );
}
