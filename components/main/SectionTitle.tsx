interface SectionTitleProps {
  children: React.ReactNode
}

const SectionTitle = ({children}: SectionTitleProps) => {
  return (
    <h1 className="text-3xl font-bold mx-auto mb-10 text-center px-4 md:px-10">{children}</h1>
  )
}

export default SectionTitle