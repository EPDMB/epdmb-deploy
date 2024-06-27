"use client";
import { useFormik } from "formik";
import { postUserRegister } from "@/helpers/services";
import { IRegisterProps, ISeller, IUser } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { registerValidations } from "@/helpers/validations";
import Input from "../Input";
import buy from "@/assets/buy.svg";
import sell from "@/assets/sell.svg";
import Image from "next/image";
import { Checkbox, Label } from "flowbite-react";

export const Register: React.FC<IRegisterProps> = ({
  onUserTypeChange,
  userType,
}) => {
  const router = useRouter();
  // seller = true
  // buyer = false

  const handleUserTypeChange = (newUserType: boolean) => {
    onUserTypeChange(newUserType);
  };

  const signUp = async (user: IUser) => {
    try {
      await postUserRegister(user);
      // formik.resetForm();
      // router.push("/login");
    } catch (error: any) {
      throw new Error(error);
    }
  };
  const signUpSeller = async (seller: ISeller) => {
    try {
      await postUserRegister(seller);
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
    onSubmit: userType ? signUpSeller : signUp,
    validate: registerValidations,
  });

  const getProps = (name: string) => {
    return {
      name: name,
      userType: userType,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values[name as keyof IUser],
    };
  };

  return (
    <div className="grow-down">
      <div className=" relative -translate-y-20 p-10  bg-white rounded-[30px] shadow-lg mt-6">
        {userType ? (
          <>
            <div className="w-80 m-auto">
              <h1 className="text-primary-dark h-12 mb-3  font-bold text-lg leading-relaxed text-center">
                ¿QUERÉS VENDER TUS PRODUCTOS EN LA PRÓXIMA FERIA?
              </h1>
            </div>
            <div className="border border-primary-default w-[75%] m-auto mb-5"></div>
          </>
        ) : (
          <>
            <div className="w-80 m-auto">
              <h1 className="text-secondary-darker h-12 mb-3 font-bold text-lg leading-relaxed text-center">
                ¿QUERÉS RENOVAR EL PLACARD?
              </h1>
            </div>
            <div className="border border-secondary-darker w-[75%] m-auto mb-5"></div>
          </>
        )}
        <button
          type="button"
          onClick={() => handleUserTypeChange(false)}
          className={`px-6 py-20 cursor-pointer ${
            userType ? "bg-[#F8F8F8]" : "bg-white"
          } rounded-tl-3xl rounded-bl-3xl  absolute left-0 -translate-x-[99%]  shadow-customLeft`}>
          <p className="absolute font-medium -left-[120%] text-secondary-darker">
            #Comprá
          </p>
          <Image src={buy} alt="Icono de compra" />
        </button>
        <button
          type="button"
          onClick={() => handleUserTypeChange(true)}
          className={`px-6 py-20 cursor-pointer ${
            userType ? "bg-white" : "bg-[#F8F8F8]"
          } rounded-tl-3xl rounded-bl-3xl  absolute left-0 -translate-x-[99%] translate-y-[99%] shadow-customLeft`}>
          <p className="absolute font-medium  -left-[120%] text-primary-dark">
            #Vendé
          </p>
          <Image src={sell} alt="Icono de venta" />
        </button>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex gap-4">
            <div className="mb-6 relative flex flex-col">
              <Input
                label="Nombre"
                type="text"
                placeholder="Juan"
                {...getProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="mb-6 relative flex flex-col">
              <Input
                label="Apellido"
                type="text"
                placeholder="Gomez"
                {...getProps("lastname")}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.lastname}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-6 relative flex flex-col">
              <Input
                label="DNI"
                type="text"
                placeholder="40500300"
                {...getProps("dni")}
              />
              {formik.touched.dni && formik.errors.dni && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.dni}
                </p>
              )}
            </div>
            <div className="mb-6 relative flex flex-col">
              <Input
                label="Email"
                type="email"
                placeholder="juangomez@gmail.com"
                {...getProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-6 relative flex flex-col">
              <Input
                label="Teléfono"
                type="text"
                placeholder="+54 011 3030-3030"
                {...getProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.phone}
                </p>
              )}
            </div>
            <div className="mb-6 relative flex flex-col">
              <Input
                label="Dirección"
                type="text"
                placeholder="Av. Siempreviva 123"
                {...getProps("address")}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.address}
                </p>
              )}
            </div>
          </div>
          <div className="mb-6 relative flex flex-col">
            <Input
              label="Contraseña"
              type="password"
              placeholder="********"
              {...getProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="mb-6 relative flex flex-col">
            <Input
              label="Repetir contraseña"
              type="password"
              placeholder="********"
              {...getProps("passwordRepeat")}
            />
            {formik.touched.passwordRepeat && formik.errors.passwordRepeat && (
              <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                {formik.errors.passwordRepeat}
              </p>
            )}
          </div>
          {userType && (
            <>
              <div className="mb-6 relative flex flex-col">
                <Input
                  label="CBU / CVU / Alias"
                  type="text"
                  placeholder="12345678"
                  {...getProps("bankAccount")}
                />
                {formik.touched.bankAccount && formik.errors.bankAccount && (
                  <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                    {formik.errors.bankAccount}
                  </p>
                )}
              </div>
              <div className="mb-6 relative flex flex-col">
                <Input
                  label="Instagram"
                  type="text"
                  placeholder="juan.gomez"
                  {...getProps("instagram")}
                />
                {formik.touched.instagram && formik.errors.instagram && (
                  <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                    {formik.errors.instagram}
                  </p>
                )}
              </div>
            </>
          )}
          <div className="flex items-center gap-2">
            <Checkbox id="accept" defaultChecked />
            <Label
              htmlFor="accept"
              className={`flex ${
                userType ? "text-primary-dark" : "text-secondary-darker"
              }`}>
              Acepto los&nbsp;
              <a
                href="#"
                className={`${
                  userType ? "text-secondary-darker" : "text-primary-dark"
                } hover:underline `}>
                Términos y Condiciones
              </a>
            </Label>
          </div>
          <div className="flex justify-center">
            <button
              className={`${
                userType ? "bg-primary-dark" : "bg-secondary-darker"
              } w-32 h-9 my-6 rounded-3xl text-center text-white text-base font-bold`}
              type="submit"
              disabled={!formik.isValid}>
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
