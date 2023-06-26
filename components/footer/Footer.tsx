import Link from "next/link"

const Footer = () => {
  return (
    <div className="border-t border-gray-200 flex flex-row justify-between p-4 md:px-10">
      <p className="text-gray-400">&#169; 2023 Teman Soal</p>
      <div className="flex flex-row space-x-4">
        <Link href="/termsofservice" className="text-gray-400 hover:text-gray-500 transition duration-300">Terms of Service</Link>
        <Link href="/privacypolicy" className="text-gray-400 hover:text-gray-500 transition duration-300">Privacy Policy</Link>
      </div>
    </div>
  )
}

export default Footer