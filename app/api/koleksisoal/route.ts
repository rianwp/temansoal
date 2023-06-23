import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import soalTersimpan from "@/types/soalTersimpan"

export const POST = async (req: Request) => {
  const userSession = await getServerSession(authOptions)
  if(userSession?.user?.email) {
    try {
      const { jawaban, mapel, pembahasan, soal, pilihan } = (await req.json()) as soalTersimpan
      const { id } = await prisma.soalTersimpan.create({
        data: {
          jawaban: jawaban,
          mapel: mapel,
          pembahasan: pembahasan,
          soal: soal,
          pilihan: pilihan,
          user: {
            connect: {
              email: userSession?.user?.email
            }
          }
        }
      })
      return NextResponse.json({ 
        success: true,
        message: "Sukses",
        id
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
      const soalTersimpan = await prisma.soalTersimpan.findMany({
        where: {
          user: {
            email: userSession.user.email
          }
        }
      })
      return NextResponse.json({ 
        success: true,
        soalTersimpan
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

export const DELETE = async (req: NextRequest) => {
  const userSession = await getServerSession(authOptions)
  if(userSession?.user?.email) {
    try {
      const paramsId = req.nextUrl.searchParams.get("id")
      await prisma.soalTersimpan.delete({
        where: {
          id: paramsId || ""
        }
      })
      return NextResponse.json({ 
        success: true,
        message: "Delete Berhasil"
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