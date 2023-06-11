import Image from "next/image"

const LoginHeader = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-10">
      <Image className="w-12 h-12 mb-2.5" src="/logo.png" alt="Logo" width={48} height={48}/>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-400 inline-block text-transparent bg-clip-text text-center">Login ke Teman Soal</h1>
    </div>
  )
}

export default LoginHeader