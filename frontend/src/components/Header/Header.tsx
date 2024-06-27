import React from "react";
import Navbar from "../Navbar";
import Image from "next/image";
import headerImage from "@/assets/headerImage.png";
import logo from "@/assets/logo.png";
import "./Header.css";


function Header() {
  return (
    <div className="h-auto w-full">
      <div className="flex w-full h-auto">
        <div className="w-full h-auto">
          <div>
            <Image
              alt="logo"
              src={headerImage}
              width={800}
              height={800}
            ></Image>
          </div>
        </div>
        <div className="w-40 h-32 flex items-center">
          <Image alt="logo" src={logo} width={80} height={80}></Image>
        </div>
        <div className="w-full h-32 flex items-center">
          <Navbar />
        </div>
      </div>
      <div className=" flex flex-col items-end w-full h-auto pr-5 pb-5">
        <h1 className="innerShadowTitle flex justify-end items-end w-full md:w-[30vh] text-secondary-darker text-2xl sm:text-4xl md:text-[6vh] lg:text-[9vh]  font-bold text-wrap md:text-nowrap text-end md:pb-1 lg:pb-6 xl:pb-10 ">
          El Placard de Mi Bebot
        </h1>
        <h3 className="innerShadowSubTitle flex justify-end items-end w-full md:w-[30vh] text-secondary-darker text-md sm:text-xl md:text-[3vh] lg:text-[4vh]  font-bold text-wrap md:text-nowrap text-end lg:pb-3 xl:pb-6 ">
          Comprá. Vendé. Reciclá. Renová
        </h3>
        <h3 className="innerShadowDescription flex justify-end items-end w-full md:w-[18vh] text-secondary-darker text-sm sm:text-lg md:text-[3vh] lg:text-[3vh]  font-bold text-wrap md:text-nowrap text-end xl:pb-6 ">
          Showroom y envíos a todo el país
        </h3>
      </div>
    </div>
  );
}

export default Header;

