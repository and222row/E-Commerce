import React from "react";
import Style from "./Loader.module.css";
import { CirclesWithBar } from "react-loader-spinner";

export default function Loader() {
  return (
    <>
      <div className=" container mx-auto">
        <div className=" flex justify-center items-center">
          <CirclesWithBar
            height="100vh"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    </>
  );
}
