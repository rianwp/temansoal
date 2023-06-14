import Image from "next/image"
import Link from "next/link"

const LoginHeader = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-10">
      <Link href="/">
        <Image className="mb-2.5" src="/logo.png" alt="Logo" width={40} height={30}/>
      </Link>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-400 inline-block text-transparent bg-clip-text text-center">Login ke Teman Soal</h1>
    </div>
  )
}

export default LoginHeader