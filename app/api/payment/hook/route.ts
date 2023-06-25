import { NextResponse } from "next/server"
import crypto from "crypto"
import { prisma } from "@/lib/db"

export const POST = async (req: Request) => {
  try {
    const { signature_key, order_id, payment_type, gross_amount, status_code, transaction_status } = await req.json()
    const verifySignature = crypto.createHash('sha512').update(`${order_id}${status_code}${gross_amount}${process.env.SERVER_KEY_MIDTRANS}`).digest("hex")

    if (verifySignature !== signature_key) {
      return NextResponse.json({ 
        message: "Invalid Signature" 
      }, { 
        status: 500 
      })
    }
    if (!order_id) {
      return NextResponse.json({ 
        message: "Invalid order id" 
      }, { 
        status: 500 
      })
    }

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: order_id
      },
      select: {
        package: true
      }
    })

    const expiredAt = transaction?.package.code === "premium_monthly" ? new Date(new Date().setMonth(new Date().getMonth() + 1)) : new Date()
    await prisma.transaction.update({
      where: {
        id: order_id,
      },
      data: {
        status: transaction_status,
        amount: Number(gross_amount),
        gross_amount: Number(gross_amount),
        updatedAt: new Date(),
        payment_type: payment_type,
        expired_at: transaction_status === "capture" || transaction_status === "settlement" ? expiredAt : null,
        is_active: transaction_status === "capture" || transaction_status === "settlement" ? true : false
      }
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
}