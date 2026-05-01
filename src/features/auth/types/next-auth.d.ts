import {  User as UserType } from "./user"
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {

    user: UserType
    token:string
  }

  interface Session {

    user: UserType
  }
}


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
        user: UserType
    token:string
  }
}