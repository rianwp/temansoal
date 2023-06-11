import Image from "next/image"

const LoginHeader = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-10">
      <Image className="w-10 h-10 mb-2.5" src="/logo.png" alt="Logo" width={40} height={40}/>
      <h1 className="text-2xl font-medium text-black text-center">Login ke Teman Soal</h1>
    </div>
  )
}

export default LoginHeader