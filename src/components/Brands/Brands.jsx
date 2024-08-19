import React from "react";
import Style from "./Brands.module.css";
import useBrands from "../../Hooks/useBrands";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Brands() {
  let { data, isError, error, isLoading, isFetching } = useBrands();
  console.log(data, "data from brands");

  return (
    <>
      <div className="row">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div className=" py-8 w-full flex justify-center">
            <p>{error}</p>
          </div>
        ) : (
          data?.map((brand) => (
            <div
              key={brand._id}
              className="w-1/2 md:w-1/6 md:p-2 md:m-3 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <Link to={`/brandDetails/${brand._id}`}>
                <div>
                  <img
                    className=" w-full"
                    src={brand?.image}
                    alt={brand?.name}
                  />
                </div>
                <div className="p-5">
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {brand?.name}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}
{
  /* <div key={brand?._id} className=" w-1/6 p-3">
              <div className="product overflow-hidden">
                <Link to={`/productDetails/${brand.id}/${brand.name}`}>
                  <img
                    className=" w-full"
                    src={brand?.image}
                    alt={brand?.name}
                  />
                  <span className=" block font-light text-green-600 text-center">
                    {brand?.name}
                  </span>
                </Link>
              </div>
            </div> */
}
