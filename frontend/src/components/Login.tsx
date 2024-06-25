"use client";
import { useFormik } from "formik";
import { postUserLogin } from "@/helpers/services";
import { IUserLogin } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { loginValidations } from "@/helpers/validations";
import Input from "./Input";

export const Login = () => {
  const router = useRouter();

  const signIn = async (user: IUserLogin) => {
    try {
      await postUserLogin(user);
      formik.resetForm();
    } catch (error) {}
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: signIn,
    validate: loginValidations,
  });

  const getProps = (name: string) => {
    return {
      name: name,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values[name as keyof IUserLogin],
    };
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="Juan"
          {...getProps("email")}
        />
        {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
        <Input
          label="Password"
          type="password"
          placeholder="******"
          {...getProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <p>{formik.errors.password}</p>
        )}
      </form>
    </div>
  );
};
