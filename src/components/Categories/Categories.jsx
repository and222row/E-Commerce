import React, { useEffect, useState } from "react";
import Style from "./Categories.module.css";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  function getCategories() {
    setLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        setCategories(response.data.data);
        console.log(response.data.data, "all categories");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <h2 className="  text-center mt-9 mb-5 text-2xl font-extrabold">
        Shop Popular Categories
      </h2>
      <div className="w-[100px] h-[5px] bg-green-600 mx-auto my-9"></div>

      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto mt-4 ">
          <div className="flex flex-wrap justify-between">
            {categories.map((category) => (
              <div
                key={category._id}
                className="w-full md:w-1/3 min-h-[300px] p-3"
              >
                <Link to={`/categoryDetails/${category._id}`}>
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div>
                      <img
                        className="rounded-t-lg w-full h-[300px]"
                        src={category.image}
                        alt={category.name}
                      />
                    </div>
                    <h3 className=" text-center bg-gray-200 font-bold">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
