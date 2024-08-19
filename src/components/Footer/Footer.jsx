import React from "react";
import Style from "./Footer.module.css";
import logo from "../../assets/logo.svg";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container mx-auto flex flex-col md:flex-row flex-wrap  py-5">
          <div className="about p-2 w-full  md:w-1/4">
            <div className="about-logo ">
              <img
                src={logo}
                className="h-8 w-full mx-auto"
                alt="Flowbite Logo"
              />
            </div>
            <p>
              You will definitely find here what you are looking for. Enjoy a
              safe and easy purchasing site.
            </p>
            <h3>Social Media</h3>
            <ul className="social-links">
              <li>
                <a href="https://twitter.com" target="_blank">
                  <i className="fa-brands fa-twitter" />
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank">
                  <i className="fa-brands fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank">
                  <i className="fa-brands fa-instagram" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank">
                  <i className="fa-brands fa-linkedin" />
                </a>
              </li>
            </ul>
          </div>
          <div className="subscribe p-2 w-full  md:w-1/2">
            <div className="subscribe-submit">
              <h3 className=" text-lg text-gray-950 font-bold text-center">
                Subscribe our Newsletter
              </h3>
              <p>
                Don't miss out on our latest menu updates and exclusive offers -
                join our newsletter today and stay up-to-date with all things
                Mealify!
              </p>
              <div className="sunscription-group">
                <input type="email" placeholder="Enter Your Email Address" />
                <button className="  text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm  text-center cursor-pointer">
                  <i className="fa-solid fa-envelope" /> Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="details p-2 w-full  md:w-1/4">
            <h3 className="text-lg text-gray-950 font-bold text-center">
              Get in Touch
            </h3>
            <ul>
              <li>
                <i className="fa-solid fa-location-dot" />
                <span>A108 Adam Street, New York, NY 535022 </span>
              </li>
              <li>
                <i className="fa-solid fa-envelope" />
                <a href="mailto:contact@example.com">contact@example.com</a>
              </li>
              <li>
                <i className="fa-solid fa-phone" />
                <a href="tel:+1 5589 55488 55">+1 5589 55488 55</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
