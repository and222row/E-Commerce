import React, { useContext, useState } from "react";
import Style from "./ForgetPassword.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let { setUserLogin } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setaApiError] = useState("");
  const [askedCode, setAskedCode] = useState(false);
  const [resetPass, setResetPass] = useState(false);
  let navigate = useNavigate();

  async function handlePassword(formikValues) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email: formikValues.email,
      })
      .then((Response) => {
        setIsLoading(false);
        console.log(Response);
        setaApiError(null);
        setAskedCode(true);
        setResetPass(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setaApiError("Email is not exist");
        setAskedCode(false);
        setResetPass(false);
      });
  }
  async function handleCode(formikValues) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: formikValues.resetCode,
      })
      .then((Response) => {
        setIsLoading(false);
        console.log(Response);
        setaApiError(null);
        setResetPass(true);
        setAskedCode(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setaApiError("code not correct");
      });
  }
  async function handleReset(formikValues) {
    setIsLoading(true);
    console.log(formikValues);
    axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        formikValues
      )
      .then((Response) => {
        setIsLoading(false);
        console.log(Response, "response from reset Pass");
        setaApiError(null);
        localStorage.setItem("userToken", Response.data.token);
        setUserLogin(Response.data.token);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setaApiError("Password not correct");
      });
  }
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
  });
  /* let resetValidationSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),

    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with uppercase then 5 to 10 digits"
      )
      .required("password is required"),
  }); */
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handlePassword,
    validationSchema,
  });
  let newFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleCode,
  });

  let resetFormik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handleReset,
    //resetValidationSchema,
  });
  return (
    <>
      {apiError ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {apiError}
        </div>
      ) : null}
      {!askedCode && !resetPass ? (
        <div className="container mx-auto py-5">
          <h2 className=" text-center text-2xl font-bold my-10  text-green-700 focus:ring-4 focus:outline-none focus:ring-green-300  rounded-lg">
            Password forget!
          </h2>
          <form
            className=" max-w-2xl mx-auto  my-20"
            onSubmit={formik.handleSubmit}
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
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
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? (
                <i className=" fas fa-spinner fa-spin"></i>
              ) : (
                "submit"
              )}
            </button>
          </form>
        </div>
      ) : askedCode && !resetPass ? (
        <div className="container mx-auto py-5 my-16">
          <h2 className=" text-center text-2xl font-bold my-10  text-green-700 focus:ring-4 focus:outline-none focus:ring-green-300  rounded-lg">
            please enter your verification code
          </h2>
          <form
            className=" max-w-2xl mx-auto * mb-4"
            onSubmit={newFormik.handleSubmit}
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="resetCode"
                id="resetCode"
                value={newFormik.values.resetCode}
                onChange={newFormik.handleChange}
                onBlur={newFormik.handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="resetCode"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter the Code that sent by E-Mail :
              </label>
            </div>
            {newFormik.errors.resetCode && newFormik.touched.resetCode ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {newFormik.errors.resetCode}
              </div>
            ) : null}
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? <i className=" fas fa-spinner fa-spin"></i> : "send"}
            </button>
          </form>
        </div>
      ) : (
        <div className="container mx-auto py-5 my-10">
          <h2 className=" text-center text-2xl font-bold my-10  text-green-700 focus:ring-4 focus:outline-none focus:ring-green-300  rounded-lg">
            please reset your Password
          </h2>
          <form
            className=" max-w-2xl mx-auto * mb-4"
            onSubmit={resetFormik.handleSubmit}
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="Email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                value={resetFormik.values.email}
                onChange={resetFormik.handleChange}
                onBlur={resetFormik.handleBlur}
              />
              <label
                htmlFor="Email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your E-mail :
              </label>
            </div>
            {resetFormik.errors.email && resetFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {resetFormik.errors.email}
              </div>
            ) : null}

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                value={resetFormik.values.newPassword}
                onChange={resetFormik.handleChange}
                onBlur={resetFormik.handleBlur}
              />
              <label
                htmlFor="newPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your new Password :
              </label>
            </div>
            {resetFormik.errors.newPassword &&
            resetFormik.touched.newPassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {resetFormik.errors.newPassword}
              </div>
            ) : null}

            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? (
                <i className=" fas fa-spinner fa-spin"></i>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
