import { atom } from "recoil"

export const mataPelajaranState = atom({
  key: "mataPelajaranState",
  default: "", 
})

export const topikState = atom({
  key: "topikState",
  default: "", 
})

export const tingkatKesulitanState = atom({
  key: "tingkatKesulitanState",
  default: "Umum", 
})

export const jenisSoalState = atom({
  key: "jenisSoalState",
  default: "Pilihan Ganda", 
})