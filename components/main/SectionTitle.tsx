interface SectionTitleProps {
  children: React.ReactNode
}

const SectionTitle = ({children}: SectionTitleProps) => {
  return (
    <h1 className="text-3xl font-bold mx-auto mb-5 text-center">{children}</h1>
  )
}

export default SectionTitle