export interface IRegisterFormErrors {
  name?: string;
  lastname?: string;
  dni?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
  passwordRepeat?: string;
  bankAccount?: string;
  instagram?: string;
}

export interface ILoginFormErrors {
  email?: string;
  password?: string;
}

export interface IUser {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

export interface ISeller extends IUser {
  bankAccount: string;
  instagram: string;
}

export interface IUserValues extends IUser {
  passwordRepeat: string;
}

export interface ISellerValues extends ISeller {
  passwordRepeat: string;
}

export interface IInputProps {
  label: string;
  userType: boolean;
  type?: string;
  placeholder?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAuthContext {
  token: string;
  setToken: (token: string) => void;
  userData: IUser | null;
  setUserData: (userData: IUser | null) => void;
}

export interface IAuthProviderProps {
  children: React.ReactNode;
}
