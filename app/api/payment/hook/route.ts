import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
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
}