import React, { useContext, useEffect } from "react";
import Style from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";

export default function Navbar() {
  let { noOfCartItems, getLoggedUserCart } = useContext(CartContext);
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    setUserLogin(null);
    navigate("/login");
  }
  /*  async function forgetPassword() {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email: localStorage.getItem("userEmail"),
      })
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
  } */
  function getCart() {
    getLoggedUserCart();
  }
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <nav className=" border-gray-200 bg-green-600 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </NavLink>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ul className="flex ">
              {!userLogin ? (
                <>
                  <li>
                    <NavLink
                      to="login"
                      className=" block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      <span className="block text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">
                        Login
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="register"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      <span className="block text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">
                        Register
                      </span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="">
                    <span
                      onClick={logOut}
                      className="block text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
                    >
                      Logout
                    </span>
                  </li>
                  {/*  <li className="">
                    <span
                      onClick={forgetPassword}
                      className="block text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
                    >
                      forget password
                    </span>
                  </li> */}
                </>
              )}
            </ul>

            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className={`${
                userLogin ? "inline-flex" : "hidden"
              } items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            {userLogin ? (
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-green-600 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white bg-[#1abc9c] rounded-lg transition-colors duration-200 text-lg"
                        : "block py-2 px-3 text-white text-lg"
                    }
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="cart"
                    className={({ isActive }) =>
                      isActive
                        ? "block relative py-2 px-3 text-white bg-[#1abc9c] rounded-lg transition-colors duration-200 text-lg"
                        : "block relative py-2 px-3 text-white text-lg"
                    }
                  >
                    Cart
                    {noOfCartItems != 0 ? (
                      <div className=" absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-2 dark:border-gray-900">
                        {noOfCartItems}
                      </div>
                    ) : null}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="products"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white bg-[#1abc9c] rounded-lg transition-colors duration-200 text-lg"
                        : "block py-2 px-3 text-white text-lg"
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="brands"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white bg-[#1abc9c] rounded-lg transition-colors duration-200 text-lg"
                        : "block py-2 px-3 text-white text-lg"
                    }
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="categories"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white bg-[#1abc9c] rounded-lg transition-colors duration-200 text-lg"
                        : "block py-2 px-3 text-white text-lg"
                    }
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="wish"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white bg-[#1abc9c] rounded-lg transition-colors duration-200 text-lg"
                        : "block py-2 px-3 text-white text-lg"
                    }
                  >
                    Wish<i className="fa-solid fa-cart-plus ps-3"></i>
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
