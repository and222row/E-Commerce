import React, { useState } from "react";
import Style from "./ShippingAddress.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ShippingAddress() {
  let { id } = useParams();
  console.log(id, "cartID");
  const [isLoading, setIsLoading] = useState(false);
  function handleCheckOut(formikValues) {
    setIsLoading(true);
    console.log(formikValues);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,
        { shippingAddress: formikValues },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
          params: {
            url: "http://localhost:5173",
          },
        }
      )
      .then((apiResponse) => {
        setIsLoading(false);
        console.log(apiResponse, "checkout-response");
        location.href = apiResponse.data.session.url;
      })
      .catch((apiResponse) => {
        setIsLoading(false);
        console.log(apiResponse, "checkout-response");
      });
  }
  let validationSchema = Yup.object().shape({
    city: Yup.string().required("city is required"),
    phone: Yup.string().required("phone is required"),
    details: Yup.string().required("details is required"),
  });
  let formik = useFormik({
    initialValues: {
      city: "",
      phone: "",
      details: "",
    },
    onSubmit: handleCheckOut,
    validationSchema,
  });
  return (
    <>
      <h2 className=" text-center text-2xl font-bold my-10">
        Adding your address
      </h2>
      <form
        className=" max-w-2xl mx-auto * mb-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your City :
          </label>
        </div>
        {formik.errors.city && formik.touched.city ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.city}
          </div>
        ) : null}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your phone :
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.phone}
          </div>
        ) : null}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your dertails :
          </label>
        </div>
        {formik.errors.details && formik.touched.details ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.details}
          </div>
        ) : null}

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <i className=" fas fa-spinner fa-spin"></i> : "Pay Now"}
        </button>
      </form>
    </>
  );
}
