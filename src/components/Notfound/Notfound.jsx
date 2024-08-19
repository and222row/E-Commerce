import React from "react";
import error from "../../assets/error.svg";
import Style from "./Notfound.module.css";

export default function Notfound() {
  return (
    <>
      <div className="flex justify-center items-center min-h-[67vh]">
        <img src={error} alt="errorLogo" className="w-full lg:w-3/4" />
      </div>
    </>
  );
}
