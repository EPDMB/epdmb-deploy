"use client";
import { IAuthContext, IAuthProviderProps, IUser } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    const userDataStorage = localStorage.getItem("userData");
    if (tokenStorage && userDataStorage) {
      setToken(tokenStorage);
      setUserData(JSON.parse(userDataStorage));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
