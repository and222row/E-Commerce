import React, { useEffect, useState } from "react";
import Style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        setCategories(response.data.data);
        console.log(response.data.data, "all categories");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className="mt-4 bg-slate-200 text-center py-14">
        <h2 className=" text-2xl mt-5 font-extrabold mb-12">
          Shop Popular Categories
        </h2>
        <div className="w-[100px] h-[5px] bg-green-600 mx-auto my-9"></div>

        <div className="row mx-auto ">
          <Slider {...settings} className=" my-6 w-full">
            {categories.map((category) => (
              <div key={category.image}>
                <Link to={`/categoryDetails/${category._id}`}>
                  <img
                    className=" w-full h-[200px] cursor-pointer"
                    src={category.image}
                    alt={category.name}
                  />
                  <h3 className=" text-center">{category.name}</h3>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
