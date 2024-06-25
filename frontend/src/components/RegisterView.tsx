import React from "react";
import { Register } from "./Register";
import Image from "next/image";
import sellerBanner from "@/assets/registerSellBanner.png";
import buyBanner from "@/assets/registerBuyBanner.png";

export const RegisterView = () => {
  return (
    <main className=" py-6 px-14  bg-secondary-light ">
      <div className="bg-white registerGrid rounded-xl relative">
        <Image
          className="registerBanner rounded-t-xl"
          src={sellerBanner}
          alt=""></Image>
        <div className="registerMessage">
          <div className="text-center w-[50%]">
            <div className="">
              <h1 className="text-primary-darker text-4xl mb-4 font-bold">
                Registrate
              </h1>
              <p className="text-primary-dark ">¿Ya tenés cuenta?</p>
              <p className="text-primary-dark ">¡Inicia sesión!</p>
            </div>
            <div className="text-primary-dark  my-5">
              <p>O ingresa con:</p>
              <p>Imagen google</p>
            </div>
          </div>
        </div>
        <div className="registerForm">
          <Register />
        </div>
      </div>
    </main>
  );
};
