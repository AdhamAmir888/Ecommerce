"use client"

const Error = ({error: {error}}: {error: {error: string}}) => {
  return (
    <div className=" flex justify-center items-center h-screen"><h1 className="text-6xl text-amber-500">{error}</h1></div>
  )
}

export default Error