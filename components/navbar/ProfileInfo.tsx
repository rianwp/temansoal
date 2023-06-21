import { Separator } from "../ui/separator"

interface ProfileInfoProps {
  name: string,
  email: string,
  status: string
}

const ProfileInfo = ({name, email, status}: ProfileInfoProps) => {
  const isPremium = status === "Premium" ? "text-emerald-500" : ""
  return (
    <>
      <div className="flex flex-col items-start px-2 py-1.5">
        <p className="flex flex-row space-x-1 line-clamp-1">
          <p className="font-medium text-sm">{name}</p>
          <p className="font-normal text-sm">|</p>
          <p className={`font-medium text-sm ${isPremium}`}>{status}</p>
        </p>
        <p className="font-normal text-sm line-clamp-1">{email}</p>
      </div>
      <Separator/>
    </>
  )
}

export default ProfileInfo