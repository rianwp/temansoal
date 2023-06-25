"use client"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Feature from "./Feature"
import PricingButton from "./PricingButton"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getFetcher, postFetcher } from "@/lib/fetcher"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

const PricingPremium = () => {
  const { data: session } = useSession()
  const { toast } = useToast()
  const { isLoading, isError, data: requestTransaction, mutateAsync } = useMutation({
    mutationKey: ["requestTransaction"],
    mutationFn: () => postFetcher("/api/payment/request", { code: "premium_monthly"}),
    onSuccess(data) {
      window.open(data.redirectUrl, "_blank")
    },
  })
  const { data: accountStatus } = useQuery({
    queryKey: ["accountStatus"],
    queryFn: () =>
      getFetcher("/api/accountstatus")
  })
  const isPremium = accountStatus?.isPremium ? true : false
  const handleTransaction = async () => {
    if(!isLoading){
      await mutateAsync()
      if(!isLoading){
        if(isError){
          toast({
            variant: "destructive",
            title: "Terjadi Kesalahan",
          })
        }
      }
    }
  }
  return (
    <div className="p-4 md:w-1/2 w-full">
      <Card className="p-8 flex flex-col space-y-4 w-full">
        <div className="flex flex-col space-y-5 items-center w-full">
          <div className="flex-col flex items-center">
            <p className="text-2xl font-semibold">Paket Premium</p>
            <p className="text-sm text-gray-400">Untuk guru dan pengguna umum</p>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row justify-center items-center space-x-1">
              <p className="text-xs">35.000</p>
              <p className="text-xs bg-sky-500 px-1 py-0.5 rounded-full text-white">Diskon 28%</p>
            </div>
            <div className="flex flex-row justify-center items-baseline">
              <p className="text-xs">Rp.</p>
              <p className="text-2xl font-bold">25.200</p>
              <p className="text-xs">/bln</p>
            </div>
          </div>
          {session?.user ?
            isPremium ?
              <PricingButton disabled={true}>Aktif</PricingButton>
              :
              <PricingButton onClick={handleTransaction} disabled={isLoading}>Beli</PricingButton>
            :
            <Link className="w-full" href="/login">
              <PricingButton>Beli</PricingButton>
            </Link>
          }
        </div>
        <Separator/>
        <div className="flex flex-col space-y-2">
          <Feature isChecked={true}>Fitur Buat Soal</Feature>
          <Feature isChecked={true}>Fitur Koleksi Soal</Feature>
          <Feature isChecked={true}>Unlimited Buat Soal</Feature>
        </div>
      </Card>
    </div>
  )
}

export default PricingPremium