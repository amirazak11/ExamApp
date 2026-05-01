import {  User } from "../../features/auth/types/user";

export interface ILoginFields {
  username?: string;
  password?: string;
}

export interface ILoginResponse {
  token: string;
  user: User;
}
export interface IRegisterFields {
  firstName: string
  lastName: string
  username: string
  email: string
  phone: string
  otp?: string
  password: string
  confirmPassword: string
}
export interface IRegisterResponse {
  token: string;
  user: IUser;
}
export interface ForgetPasswordPayload {
  email: string;
  redirectUrl?: string;
}
export interface ResetPasswordPayload {
  token?: string | null;
  newPassword?:string;
  currentPassword?:string;
  confirmPassword?:string;
}
export interface CreateEmailPayload {
  email: string;
}
export interface IOtp {
  email: string;
  code: string;
}



// export interface IUpdateProfileFields {
//   firstName: string;
//   lastName: string;
// }

// export interface IUpdateProfileResponse {
//   status: true;
//   code: number;
//   message: string;
//   payload: IUser;
// }