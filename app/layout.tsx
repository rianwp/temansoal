import Provider from "@/components/Provider"
import "./globals.css"
import { Roboto} from "next/font/google"
import { Toaster } from "@/components/ui/toaster"

const font = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] })

export const metadata = {
  title: "Teman Soal",
  description: "",
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({children}: RootLayoutProps) => {
  return (
    <Provider>
      <html lang="en">
        <body className={`${font.className} overflow-y-hidden`}>
          {children}
          <Toaster/>
        </body>
      </html>
    </Provider>
  )
}

export default RootLayout
