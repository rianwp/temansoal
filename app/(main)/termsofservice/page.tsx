import Footer from "@/components/footer/Footer"
import TermsOfService from "@/components/termsofservice"

export const metadata = {
  title: "Terms of Service",
  description: "",
}

const Page = () => {
  return (
    <>
      <TermsOfService/>
      <Footer/>
    </>
  )
}

export default Page