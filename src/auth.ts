import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./features/auth/schema/login-schema";
import { loginAction } from "./features/auth/api/auth/auth.api";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const result = loginSchema.safeParse({
          username: credentials?.username,
          password: credentials?.password,
        });

        if (!result.success) {
          throw new Error("Invalid username or password.");
        }

        const data = await loginAction(result.data);

        if (!data.status) {
          throw new Error(data.message);
        }

        if (!data.payload) {
          throw new Error("No payload received");
        }

        return {
          id: String(data.payload.user.id),
          token: data.payload.token,
          user: data.payload.user,
        };
        
      },
    }),
  ],

callbacks: {
  jwt: ({ token, user, session, trigger }) => {
    if (user) {
      token.user = user.user;
      token.token = user.token;
    }

    if (trigger === "update" && session) {
      token.user = session.user;
      token.token = session.token;
    }

    return token;
  },

  session: ({ session, token }) => {
    session.user = token.user;
    return session;
  },
},
  secret: process.env.NEXTAUTH_SECRET,
};
