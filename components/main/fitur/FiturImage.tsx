const FiturImage = () => {
  return (
    <div className="md:w-1/2 w-full p-4 flex flex-row justify-center items-start aspect-video">
      <div className="relative w-11/12 h-11/12 aspect-video">
        <div className="w-full absolute z-10 bg-gradient-to-r from-blue-600 to-sky-500 aspect-video rounded-lg -top-3 -left-3 md:top-0 md:left-0"/>
        <div className="w-full absolute z-20 top-3 left-3 md:top-6 md:left-6 aspect-video shadow-lg border border-gray-200 rounded-lg overflow-hidden bg-gray-200">
          <video autoPlay loop muted playsInline className="w-full object-contain">
            <source src="/fitur.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>
    </div>
  )
}

export default FiturImage