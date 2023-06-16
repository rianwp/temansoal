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
  default: "Essay", 
})

export const jumlahSoalState = atom({
  key: "jumlahSoalState",
  default: [1], 
})

export const isGenerateSoalClickedState = atom({
  key: "isGenerateSoalClickedState",
  default: false, 
})

export const haveOptionsState = atom({
  key: "haveOptionsState",
  default: false,
})

export const isFormValidState = atom({
  key: "isFormValidState",
  default: false,
})