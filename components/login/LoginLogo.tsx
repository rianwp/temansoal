import Image from "next/image"

const LoginLogo = () => {
  return (
    <div className="absolute z-10 w-full h-full flex flex-row justify-center items-center space-x-5">
      <Image className="w-20 h-20" src="/logowhite.png" alt="Logo" width={100} height={100}/>
      <h1 className="text-5xl text-secondary font-bold">Teman Soal</h1>
    </div>
  )
}

export default LoginLogo