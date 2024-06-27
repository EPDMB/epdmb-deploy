"use client";

import React from "react";
import Image from "next/image";
import loginBanner from "@/assets/loginBanner.png";
import gmailLogo from "@/assets/gmailLogo.svg";
import Link from "next/link";
import { Login } from "./Login";

export const LoginView = () => {
  return (
    <main className="py-6 px-14 bg-secondary-light">
      <div className="bg-white h-full pb-40 formGrid rounded-xl ">
        <div className="loginBanner h-[300px] overflow-hidden">
          <Image
            className=" rounded-t-xl object-cover w-full "
            src={loginBanner}
            alt="portada del login"></Image>
        </div>
        <div className="loginForm flex justify-center">
          <Login />
        </div>
        <div className="loginMessage mt-10">
          <div className="text-center w-full flex h-[50vh] flex-col justify-between">
            <div>
              <h1 className="text-primary-darker text-4xl mb-4 font-bold">
                Inicia Sesión
              </h1>
              <p className="text-primary-dark">¿Primera vez que nos visitas?</p>
              <Link href="/register" className="text-primary-dark">
                ¡Registrate!
              </Link>
            </div>
            <div className="text-primary-dark my-5 flex flex-col items-center">
              <p>O ingresa con:</p>
              <div className="mt-6 w-15 h-15 bg-white border p-2 border-white shadow-[1px_4px_4px_rgba(0,0,0,0.25)] rounded-lg">
                <Image src={gmailLogo} alt="logo de Gmail" className=""></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
