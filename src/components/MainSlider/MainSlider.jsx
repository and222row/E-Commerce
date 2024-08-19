import React from "react";
import Style from "./MainSlider.module.css";
import Slider from "react-slick";
import mainSlider1 from "../../assets/images/main-1.jpeg";
import mainSlider2 from "../../assets/images/main-2.jpeg";
import mainSlider3 from "../../assets/images/main-3.png";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  return (
    <>
      <div className="row my-10">
        <div className=" w-full md:w-3/4">
          <Slider {...settings}>
            <img src={mainSlider1} className=" w-full h-[400px]" />
            <img src={mainSlider2} className=" w-full h-[400px]" />
            <img src={mainSlider3} className=" w-full h-[400px]" />
          </Slider>
        </div>
        <div className="w-full flex md:flex-col md:w-1/4">
          <img src={slide1} className=" w-1/2 md:w-full h-[200px]" />
          <img src={slide2} className=" w-1/2 md:w-full h-[200px]" />
        </div>
      </div>
    </>
  );
}
