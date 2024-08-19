import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import AddButton from "../AddButton/AddButton";

export default function ProductDetails() {
  const [loading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  let { id, category } = useParams();
  let { addProductToCart } = useContext(CartContext);
  async function addProduct(productId) {
    setCurrentProductId(productId);
    setLoading(true);
    let response = await addProductToCart(productId);
    setLoading(false);
    console.log(response);
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        setProductDetails(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getRelatedProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/`)
      .then((response) => {
        let allData = response.data.data;
        let related = allData.filter(
          (product) => product.category.name == category
        );
        setRelatedProducts(related);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);

  return (
    <>
      <div className="row">
        <div className=" w-1/4">
          <Slider {...settings}>
            {productDetails?.images.map((src) => (
              <img
                key={src}
                className=" w-full"
                src={src}
                alt={productDetails?.title}
              />
            ))}
          </Slider>
        </div>
        <div className=" w-3/4 p-6">
          <h1 className=" text-lg font-normal text-gray-950">
            {productDetails?.title}
          </h1>
          <p className=" text-gray-600 mt-4 font-light">
            {productDetails?.description}.
          </p>
          <div className=" flex justify-between items-center my-5">
            <span>{productDetails?.price} $</span>
            <span>
              {productDetails?.ratingsAverage}
              <i className="fas fa-star text-yellow-400"></i>
            </span>
          </div>
          <button onClick={() => addProduct(productDetails.id)} className="btn">
            {currentProductId == productDetails?.id && loading ? (
              <i className=" fas fa-spinner fa-spin"></i>
            ) : (
              "add to cart"
            )}
          </button>
        </div>
      </div>
      <h2 className=" text-lg text-gray-900 mt-9 text-center">
        Related Products
      </h2>
      <div className="row">
        {relatedProducts.map((product) => (
          <div key={product.id} className=" w-1/6 p-3">
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
                <div className=" flex justify-between items-center">
                  <span>{product.price} $</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fas fa-star text-yellow-400"></i>
                  </span>
                </div>
                <button className="btn">add to cart</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
