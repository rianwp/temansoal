import Navbar from "@/components/navbar/Navbar"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <>
      <Navbar isHome={true}/>
      <div className="pt-16">
        {children}
      </div>
    </>
  )
}

export default Layout