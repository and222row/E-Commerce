import React, { useEffect, useState } from "react";
import Style from "./BrandDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BrandDetails() {
  let { id } = useParams();
  const [brands, setBrands] = useState({});
  function getBrandDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((response) => {
        setBrands(response.data.data);
        console.log(response.data.data, "data from specefic brans");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getBrandDetails(id);
  }, [id]);
  return (
    <>
      <div className="row ">
        <div className=" w-1/2 mx-auto">
          <img
            key={brands._id}
            className=" w-full"
            src={brands.image}
            alt={brands?.name}
          />
        </div>
        <div className="w-full p-6">
          <h1 className=" text-lg text-center font-normal text-gray-950">
            {brands?.name}
          </h1>
        </div>
      </div>
    </>
  );
}
