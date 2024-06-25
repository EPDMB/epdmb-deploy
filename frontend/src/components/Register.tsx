"use client";
import { useFormik } from "formik";
import { postUserRegister } from "@/helpers/services";
import { ISeller, ISellerValues, IUser, IUserValues } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { registerValidations } from "@/helpers/validations";
import Input from "./Input";
import buy from "@/assets/buy.svg";
import sell from "@/assets/sell.svg";
import Image from "next/image";

export const Register: React.FC = () => {
  const router = useRouter();
  // seller = true
  // buyer = false

  const [userType, setUserType] = useState(true);

  const signUp = async (user: IUserValues) => {
    try {
      const userData: IUser = {
        name: user.name,
        lastname: user.lastname,
        dni: user.dni,
        email: user.email,
        phone: user.phone,
        address: user.address,
        password: user.password,
      };
      await postUserRegister(userData);
      formik.resetForm();
      router.push("/login");
    } catch (error: any) {
      throw new Error(error);
    }
  };
  const signUpSeller = async (seller: ISellerValues) => {
    try {
      const sellerData: ISeller = {
        name: seller.name,
        lastname: seller.lastname,
        dni: seller.dni,
        email: seller.email,
        phone: seller.phone,
        address: seller.address,
        password: seller.password,
        bankAccount: seller.bankAccount,
        instagram: seller.instagram,
      };
      await postUserRegister(sellerData);
      formik.resetForm();
      router.push("/login");
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      dni: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      passwordRepeat: "",
      bankAccount: "",
      instagram: "",
    },
    onSubmit: userType ? signUp : signUpSeller,
    validate: registerValidations,
  });

  const getProps = (name: string) => {
    return {
      name: name,
      userType: userType,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values[name as keyof IUserValues],
    };
  };

  return (
    <div className="flex flex-col items-center relative">
      <button
        type="button"
        onClick={() => setUserType(false)}
        className={`px-6 py-20 cursor-pointer ${
          userType ? "bg-[#F8F8F8]" : "bg-white"
        }  rounded-tl-3xl rounded-bl-3xl  absolute left-0 -translate-x-[100%] translate-y-[30%] drop-shadow-lg `}>
        <p className="absolute font-medium hidden -left-[120%] text-secondary-darker">
          #Comprá
        </p>
        <Image src={buy} alt="Icono de compra" />
      </button>
      <button
        type="button"
        onClick={() => setUserType(true)}
        className={`px-6 py-20 cursor-pointer ${
          userType ? "bg-white" : "bg-[#F8F8F8]"
        } rounded-tl-3xl rounded-bl-3xl  absolute left-0 -translate-x-[100%] translate-y-[129%] drop-shadow-lg`}>
        <p className="absolute font-medium hidden -left-[120%] text-secondary-darker">
          #Vendé
        </p>
        <Image src={sell} alt="Icono de venta" />
      </button>

      <div className="z-10 w-[100%] p-10 drop-shadow-lg bg-white rounded-[30px] shadow">
        {userType ? (
          <h1 className="text-primary-dark font-bold  leading-relaxed text-center ">
            ¿QUERÉS VENDER TUS PRODUCTOS EN LA PRÓXIMA FERIA?
          </h1>
        ) : (
          <h1 className="text-primary-dark font-bold  leading-relaxed text-center ">
            ¿QUERÉS RENOVAR EL PLACARD?
          </h1>
        )}

        <div className="border border-primary-default w-[75%] m-auto mb-5 "></div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex gap-4">
            <Input
              label="Nombre"
              type="text"
              placeholder="Juan"
              {...getProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <p>{formik.errors.name}</p>
            )}
            <Input
              label="Apellido"
              type="text"
              placeholder="Gomez"
              {...getProps("lastname")}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <p className=" text-red-600 font-medium text-center w-3/4">
                {formik.errors.lastname}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <Input
              label="DNI"
              type="text"
              placeholder="40500300"
              {...getProps("dni")}
            />
            {formik.touched.dni && formik.errors.dni && (
              <p className=" text-red-600 font-medium text-center w-3/4">
                {formik.errors.dni}
              </p>
            )}
            <Input
              label="Email"
              type="email"
              placeholder="juangomez@gmail.com"
              {...getProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className=" text-red-600 font-medium text-center w-3/4">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <Input
              label="Teléfono"
              type="text"
              placeholder="+54 011 3030-3030"
              {...getProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className=" text-red-600 font-medium text-center w-3/4">
                {formik.errors.phone}
              </p>
            )}
            <Input
              label="Dirección"
              type="text"
              placeholder="Av. Siempreviva 123"
              {...getProps("address")}
            />
            {formik.touched.address && formik.errors.address && (
              <p className=" text-red-600 font-medium text-center w-3/4">
                {formik.errors.address}
              </p>
            )}
          </div>
          <Input
            label="Contraseña"
            type="password"
            placeholder="********"
            {...getProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <p className=" text-red-600 font-medium text-center w-3/4">
              {formik.errors.password}
            </p>
          )}
          <Input
            label="Repetir contraseña"
            type="password"
            placeholder="********"
            {...getProps("passwordRepeat")}
          />
          {formik.touched.passwordRepeat && formik.errors.passwordRepeat && (
            <p className=" text-red-600 font-medium text-center w-3/4">
              {formik.errors.passwordRepeat}
            </p>
          )}
          {userType && (
            <>
              <Input
                label="CBU / CVU / Alias"
                type="text"
                placeholder="12345678"
                {...getProps("bankAccount")}
              />
              {formik.touched.bankAccount && formik.errors.bankAccount && (
                <p className="text-red-600 font-medium text-center w-3/4">
                  {formik.errors.bankAccount}
                </p>
              )}
              <Input
                label="Instagram"
                type="text"
                placeholder="juan.gomez"
                {...getProps("instagram")}
              />
              {formik.touched.instagram && formik.errors.instagram && (
                <p className="text-red-600 font-medium text-center w-3/4">
                  {formik.errors.instagram}
                </p>
              )}
            </>
          )}
          <button
            className="w-32 h-9 my-6 bg-primary-dark rounded-3xl text-center text-white text-base font-bold"
            type="submit"
            disabled={formik.isValid ? false : true}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
