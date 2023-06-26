import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { Package } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

export const POST = async (req: Request) => {
  const userSession = await getServerSession(authOptions)
  if(userSession?.user?.email) {
    try {
      const { code } = (await req.json()) as {
        code: string
      }
      const { price, id } = await prisma.package.findFirst({
        where: {
          code: code
        }
      }) as Package

      const orderId = uuidv4()
      const packId = id

      const dataTransaction = {
        transaction_details: {
          order_id: orderId,
          gross_amount: price
        },
        customer_details: {
          
        }
      }
      const transactionResponse = await fetch(process.env.MIDTRANS_SERVER_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Basic ${process.env.MIDTRANS_SERVER_KEY_HASHED}`
        },
        body: JSON.stringify(dataTransaction)
      })
      const transactionJson = await transactionResponse.json() as {
        token: string,
        redirect_url: string
      }

      await prisma.transaction.create({
        data: {
          id: orderId,
          package: {
            connect: {
              id: packId
            }
          },
          amount: price,
          status: "pending",
          payment_type: "midtrans",
          gross_amount: price,
          user: {
            connect: {
              email: userSession.user.email
            }
          }
        }
      })
      return NextResponse.json({ 
        success: true,
        redirectUrl: `${transactionJson.redirect_url}?gopayMode=deeplink`
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