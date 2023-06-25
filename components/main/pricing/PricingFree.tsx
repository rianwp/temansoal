"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Feature from "./Feature"
import TooltipInformation from "./TooltipInformation"
import PricingButton from "./PricingButton"
import { useSession } from "next-auth/react"

const PricingFree = () => {
  const { data: session, status } = useSession()
  return (
    <div className="p-4 md:w-1/2 w-full">
      <Card className="p-8 flex flex-col space-y-4 w-full">
        <div className="flex flex-col space-y-5 items-center w-full">
          <div className="flex-col flex items-center">
            <p className="text-2xl font-semibold">Paket Free</p>
            <p className="text-sm text-gray-400">Untuk semua pengguna</p>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row justify-center items-center space-x-1">
              <p className="py-0.5 text-xs text-gray-400">Dapatkan dengan Sign Up</p>
            </div>
            <div className="flex flex-row justify-center items-baseline">
              <p className="text-xs">Rp.</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
          {session?.user ?
            <Link className="w-full" href="/buatsoal">
              <PricingButton disabled={true}>Sign Up</PricingButton>
            </Link>
            :
            <Link className="w-full" href="/login">
              <PricingButton>Sign Up</PricingButton>
            </Link>
          }
        </div>
        <Separator/>
        <div className="flex flex-col space-y-2">
          <Feature isChecked={true}>Fitur Buat Soal</Feature>
          <Feature isChecked={true}>Fitur Koleksi Soal</Feature>
          <div className="flex flex-row space-x-1 items-center">
            <Feature isChecked={false}>Unlimited Buat Soal</Feature>
            <TooltipInformation/>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PricingFree