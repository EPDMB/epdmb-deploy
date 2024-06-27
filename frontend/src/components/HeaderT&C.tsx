import React from "react"
import Navbar from "./Navbar"
import Image from "next/image"
import Globo from "@/assets/Globo.svg"
import Cloud from "@/assets/Cloud.svg"
import logo from "@/assets/logo.png"


function HeaderTerms() {
  return (
    <div className="h-auto w-full bg-secondary-lighter">
      <div className="flex justify-between w-full h-1/2">
        <div className="w-full h-80">
          <div><Image alt="logo" src={Cloud} width={250} height={250} className="-mt-14 -ml-12"></Image></div>
          <div><Image alt="logo" src={Cloud} width={150} height={150} className="-mt-40 ml-96"></Image></div>
          <div><Image alt="logo" src={Cloud} width={150} height={150} className="-mt-12 ml-28"></Image></div>
          <div><Image alt="logo" src={Cloud} width={250} height={250} className="-mt-40 ml-72"></Image></div>
          <div><Image alt="logo" src={Globo} width={350} height={350} className="-mt-64 ml-32"></Image></div>
          <div><Image alt="logo" src={Cloud} width={300} height={300} className="-mt-60 -ml-20"></Image></div>
        </div>
          <div className="w-40 h-32 flex items-center">
            <Image alt="logo" src={logo} width={80} height={80}></Image>
          </div>

        <div className="w-full h-32 flex items-center">
          <Navbar />
        </div>

      </div>
      <div className="flex flex-col items-end w-full h-1/2 pr-10 gap-6 justify-center">
        <h1 className="innerShadowTitleTerms flex justify-end text-primary-dark w-full text-7xl font-bold">
          Términos y Condiciones
        </h1>
        
          <h3 className="innerShadowSubTitleTerms flex justify-end w-full text-primary-dark text-4xl font-semibold">
          Leé el contenido, completa el formulario y sacá turno
          </h3>
          <h3 className="innerShadowDescriptionTerms flex justify-end w-full text-secondary-darker text-2xl font-semibold">
            Sumate a nuestra comunidad
          </h3>
        
      </div>
    </div>
  )
}

export default HeaderTerms
