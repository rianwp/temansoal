import Link from "next/link"

const Footer = () => {
  return (
    <div className="border-t border-gray-200 flex sm:flex-row flex-col space-y-1 sm:space-y-0 sm:justify-between p-4 sm:px-10 text-sm">
      <p className="text-gray-400">&#169; 2023 Teman Soal</p>
      <div className="flex flex-row md:space-x-4 space-x-2">
        <Link href="/termsofservice" className="text-gray-400 hover:text-gray-500 transition duration-300">Terms of Service</Link>
        <Link href="/privacypolicy" className="text-gray-400 hover:text-gray-500 transition duration-300">Privacy Policy</Link>
      </div>
    </div>
  )
}

export default Footer