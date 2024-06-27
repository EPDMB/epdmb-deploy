/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import buy from "@/assets/buy.svg";
import sell from "@/assets/sell.svg";
import Image from "next/image";
import callToActionBear from "@/assets/callToActionBear.png";

export const CallToAction = () => {
  return (
    <div className="flex w-full h-[70vh] flex-row shadow-[0px_8px_8px_rgba(0,0,0,0.5)] mb-5">
      <div className="relative w-1/2 h-full bg-secondary-light flex flex-col gap-10 justify-center items-center py-10">
        <div className="w-full flex justify-center items-center">
          <h1 className="innerShadowTitleOrange text-4xl">
            #Comprá&nbsp;&nbsp;#Reciclá
          </h1>
        </div>
        <div className="relative bg-slate-50 bg-opacity-50 border-[5px] border-secondary-dark rounded-3xl h-96 w-4/6 flex flex-col items-center justify-center text-center">
          <p className="w-3/4  text-[#2A4546] font-semibold text-lg">
            1. Elige el producto que deseas comprar <br />
            2. Haz click en "Agregar al carrito" <br />
            3. Puedes seguir agregando otros productos al carrito o sino haz
            click en "Iniciar Compra" <br />
            4. Completa tus datos y haz click en "Continuar"
          </p>
          <button className="absolute top-72 bg-secondary-lighter border-[5px] border-secondary-dark rounded-3xl w-32 h-32 flex flex-col items-center justify-center">
            <Image src={buy} alt="" width={50} height={50} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-[35vh] h-[20vh] flex">
          <Image src={callToActionBear} alt="" width={500} height={500} />
        </div>
      </div>
      <div className="w-1/2 h-full bg-primary-light flex flex-col gap-10 justify-center items-center py-10">
        <div className="w-full flex justify-center items-center">
          <h1 className="innerShadowTitleBlue text-4xl">
            #Vendé&nbsp;&nbsp;#Renová
          </h1>
        </div>
        <div className="relative bg-slate-50 bg-opacity-50 border-[5px] border-primary-dark rounded-3xl h-96 w-4/6 flex flex-col items-center justify-center text-center">
          <p className="w-3/4 py-5 text-[#2A4546] font-semibold text-lg">
            1. Leer en detalle “Términos y Condiciones” <br />
            2. Enviar Formulario de Alta <br />
            3. Reservar turno para vender con el link que recibirás en el mail
            de Confirmación de Alta
          </p>
          <button className="absolute top-72 bg-primary-lighter border-[5px] border-primary-dark rounded-3xl w-32 h-32 flex flex-col items-center justify-center">
            <Image src={sell} alt="" width={50} height={50} />
          </button>
        </div>
      </div>
    </div>
  );
};
