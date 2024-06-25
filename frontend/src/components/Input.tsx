import { IInputProps } from "@/types";
import React from "react";

const Input: React.FC<IInputProps> = ({ label, userType, ...inputProps }) => {
  return (
    <div className="flex flex-col ">
      <label
        className={`w-20 ${
          userType ? "text-primary-dark" : "text-secondary-darker"
        } text-base font-medium `}>
        {label}
      </label>
      <input
        className={`border w-[100%] ${
          userType
            ? "border-primary-default bg-primary-lighter "
            : "border-secondary-default bg-secondary-lighter"
        }  rounded-md`}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
