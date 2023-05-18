import {
  CloudIcon,
  LightningBoltIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/solid"

function Loading() {
  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] min-h-screen flex flex-col items-center justify-center text-slate-500">
      <div className="flex items-center justify-evenly">
        <SunIcon
          className="h-20 md:h-24 w-20 md:w-24 text-yellow-500 animate-spin"
          color="yellow"
        />
        <CloudIcon
          className="h-20 md:h-24 w-20 md:w-24 text-gray-500 animate-bounce"
          color="gray"
        />
        <LightningBoltIcon
          className="h-20 md:h-24 w-20 md:w-24 text-yellow-500 animate-pulse"
          color="yellow"
        />
        <CloudIcon
          className="h-20 md:h-24 w-20 md:w-24 text-slate-50 animate-bounce"
          color="slate"
        />
        <MoonIcon
          className="h-20 md:h-24 w-20 md:w-24 text-slate-50 animate-spin"
          color="slate"
        />
      </div>
      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse">
        Loading Weather Information
      </h1>
      <h2 className="text-xl font-bold text-center mb-10 animate-pulse">
        Hold on, we are crunching the numbers
      </h2>
    </div>
  )
}

export default Loading
