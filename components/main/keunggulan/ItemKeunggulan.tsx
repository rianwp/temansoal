
interface ItemsKeunggulanProps {
  icon: React.ReactNode,
  judul: string,
  deskripsi: string
}

const ItemsKeunggulan = ({icon, judul, deskripsi}: ItemsKeunggulanProps) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex flex-row space-x-2 items-center">
        {icon}
        <p className="text-lg font-semibold">{judul}</p>
      </div>
      <div className="w-full text-left">
        {deskripsi}
      </div>
    </div>
  )
}

export default ItemsKeunggulan