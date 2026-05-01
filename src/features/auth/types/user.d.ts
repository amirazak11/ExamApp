import { USER_ROLES } from "../constants/api.constant";

export type TRole = (typeof USER_ROLES)[keyof (typeof USER_ROLES)]

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  profilePhoto: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: TRole;
}

export interface IUpdateProfileFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}
