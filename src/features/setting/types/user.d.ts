import { USER_ROLES } from "../constants/api.constant";

export type TRole = (typeof USER_ROLES)[keyof (typeof USER_ROLES)]
export interface IUpdateProfileFields {
  firstName: string;
  lastName: string;
  phone: string | null;
profilePhoto?: string | null;
}

export interface ResetPasswordPayload {
  token?: string | null;
  newPassword?:string;
  currentPassword?:string;
  confirmPassword?:string;
}
export interface ChangeEmailPayload {
  newEmail: string;
}

export interface IConfirmOtp {
  code: string;
}