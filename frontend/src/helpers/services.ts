import { IUser, IUserLogin } from "@/types";
import { URL } from "../../envs";

export const postUserRegister = async (user: IUser) => {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(res);

    return res;
  } catch (error: any) {
    console.error(error);
  }
};


export const postUserLogin = async (user: IUserLogin) => {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(res);

    return res;
  } catch (error: any) {
    console.error(error);
  }
};