import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { hash } from "bcrypt"
import createAccount from "@/types/createAccount"

export const POST = async (req: Request) => {
  const { email, password, nama } = (await req.json()) as createAccount
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if(!user){
      const hashedPassword = await hash(password, 10)
      await prisma.user.create({
        data: {
          email: email,
          name: nama,
          password: hashedPassword
        }
      })
      return NextResponse.json({ 
        success: true,
        message: "Silahkan Login"
      }, {
        status: 200,
      })
    } else{
      return NextResponse.json({ 
        success: false,
        message: "Email telah digunakan"
      }, {
        status: 200,
      })
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      message: "Terjadi Kesalahan"
    }, {
      status: 500,
    })
  }
}