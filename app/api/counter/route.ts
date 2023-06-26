import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export const GET = async (req: Request) => {
  try {
    const users = await prisma.user.aggregate({
      _count: {
        _all: true
      }
    })
    const usage = await prisma.soalDibuat.aggregate({
      _sum: {
        total: true
      }
    })
    return NextResponse.json({ 
      success: true,
      usersCount: users._count._all,
      usageCount: usage._sum.total
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
}