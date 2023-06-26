import Footer from "@/components/footer/Footer"
import PrivacyPolicy from "@/components/privacypolicy"

export const metadata = {
  title: "Privacy & Policy",
  description: "",
}

const Page = () => {
  return (
    <>
      <PrivacyPolicy/>
      <Footer/>
    </>
  )
}

export default Page