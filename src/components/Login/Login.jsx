import React, { useContext, useState } from "react";
import Style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { Formik, useFormik, validateYupSchema } from "formik";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let { setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  const [apiError, setaApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(formikValues) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formikValues)
      .then((apiResponse) => {
        console.log(apiResponse, "response from login");
        console.log(apiResponse.data.user.email, "response from login");
        localStorage.setItem("userEmail", apiResponse.data.user.email);
        localStorage.setItem("userToken", apiResponse.data.token);
        setUserLogin(apiResponse.data.token);
        setIsLoading(false);
        navigate("/");
      })
      .catch((apiResponse) => {
        setIsLoading(false);
        setaApiError(apiResponse?.response?.data?.message);
      });
  }
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),

    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with uppercase then 5 to 10 digits"
      )
      .required("password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema,
  });
  return (
    <>
      <div className="container mx-auto py-5">
        <h2 className="  mt-5 font-extrabold text-center text-2xl my-10">
          Sign in here!
        </h2>
        <div className="w-[50px] h-[5px] bg-green-600 mx-auto mb-9"></div>
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : null}
        <form
          className=" max-w-2xl mx-auto * mb-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your E-mail :
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your password :
            </label>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <i className=" fas fa-spinner fa-spin"></i> : "submit"}
          </button>
          <Link to="/forgetPassword">
            <span className="block my-3 text-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg">
              forget your password ?
            </span>
          </Link>
        </form>
      </div>
    </>
  );
}
