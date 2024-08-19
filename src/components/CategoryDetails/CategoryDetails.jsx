import React, { useEffect, useState } from "react";
import Style from "./CategoryDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CategoryDetails() {
  let { id } = useParams();
  const [category, setCategory] = useState({});
  function getCategoryDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((response) => {
        setCategory(response.data.data);
        console.log(response.data.data, "data from specefic Category");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getCategoryDetails(id);
  }, [id]);
  return (
    <>
      <div className="row ">
        <div className=" w-1/2 mx-auto">
          <img
            key={category._id}
            className=" w-full"
            src={category.image}
            alt={category?.name}
          />
        </div>
        <div className="w-full p-6">
          <h1 className=" text-lg text-center font-normal text-gray-950">
            {category?.name}
          </h1>
        </div>
      </div>
    </>
  );
}
