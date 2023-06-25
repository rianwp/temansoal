import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export const POST = async (req: Request) => {
  const userSession = await getServerSession(authOptions)
  if(userSession?.user?.email) {
    try {
      const { jumlahSoal } = (await req.json()) as { jumlahSoal: number }
      await prisma.soalDibuat.create({
        data: {
          total: jumlahSoal,
          user: {
            connect: {
              email: userSession.user.email
            }
          }
        },
      })
      return NextResponse.json({ 
        success: true,
        message: "Sukses"
      }, {
        status: 200,
      })
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
        const currentTime = new Date().getTime()
        const expiredTime = transaction.find((item) => item.is_active)?.expired_at?.getTime() as number
        const timeLeft = expiredTime - currentTime
        return NextResponse.json({
          success: true,
          isLimit: false,
          dayLeft: Math.floor(timeLeft/(1000 * 3600 * 24))
        }, {
          status: 200,
        })
      } else{
        const usage = await prisma.soalDibuat.aggregate({
          where: {
            user: {
              email: userSession.user.email
            },
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
              lte: new Date(new Date().setHours(23, 59, 59, 999))
            }
          },
          _sum: {
            total: true
          }
        })
        return NextResponse.json({ 
          success: true,
          total: usage._sum.total === null ? 0 : usage._sum.total,
          isLimit: true
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