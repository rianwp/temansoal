import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/db"
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ""
    }),
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        if(!credentials?.email || !credentials?.password){
          throw new Error("Email dan Password tidak valid")
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email || "",
          }
        })
        if (!user) {
          throw new Error("User tidak ditemukan")
        }
        const isPasswordValid = await compare(credentials?.password, user.password || "")
        if (!isPasswordValid) {
          throw new Error("Password salah")
        }
        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({token}) {
      return token
    },
  }
};
