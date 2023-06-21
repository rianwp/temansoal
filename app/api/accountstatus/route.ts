import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export const GET = async (req: Request) => {
  const userSession = await getServerSession(authOptions)
  if(userSession?.user?.email) {
    try {
      const transaction = await prisma.transaction.findMany({
        where: {
          user: {
            email: userSession.user.email
          },
          is_active: true,
          expired_at: {
            gte: new Date()
          }
        }
      })
      if(transaction && transaction.length > 0){
        return NextResponse.json({
          success: true,
          isPremium: true
        }, {
          status: 200,
        })
      } else{
        return NextResponse.json({
          success: true,
          isPremium: false
        }, {
          status: 200,
        })
      }
    } catch (error) {
      return NextResponse.json({ 
        success: false,
        message: "Terjadi Kesalahan pada Server"
      }, {
        status: 500,
      })
    }
  } else{
    return NextResponse.json({ 
      success: false,
      message: "Anda Harus Login Terlebih Dahulu"
    }, {
      status: 401,
    })
  }
}