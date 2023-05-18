import React from "react"
import CityPicker from "./CityPicker"
import { SunIcon, SwitchHorizontalIcon } from "@heroicons/react/solid"
import weatherCodeToString from "@/lib/weatherCodeToString"
import Image from "next/image"
import { MoonIcon } from "@heroicons/react/outline"

type Props = {
  city: string
  lat: string
  long: string
  result: Root
}

function SideBar({ city, lat, long, result }: Props) {
  return (
    <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 text-white p-10 md:w-[30%] ">
      <div className="pb-5">
        <h2 className="fonct-bold text-6xl"> {decodeURI(city)} </h2>
        <p className="text-xs text-gray-400">
          long/lat: {long}/{lat}
        </p>
      </div>
      <CityPicker />
      <hr className="my-10" />
      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
          </p>
          <p className="font-extralight">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p className="font-bold text-xl">
          {new Date().toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      </div>
      <hr className="mt-10" />
      <div>
        <div className="flex flex-col justify-center items-start">
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString[result.current_weather.weathercode].icon
            }.png`}
            alt={weatherCodeToString[result.current_weather.weathercode].label}
            width={100}
            height={100}
          />
          <div className="flex items-center justify-between space-x-10">
            <div className="flex space-x-1 items-center">
              <p className="text-4xl font-semibold left">
                {result.current_weather.temperature.toFixed(1)}°C{" "}
              </p>
              <SwitchHorizontalIcon className="w-7 h-7 hidden md:flex" />
              <p className="text-4xl font-semibold hidden md:flex ">
                {((result.current_weather.temperature * 9) / 5 + 32).toFixed(1)}
                °F{" "}
              </p>
            </div>
            <p className="text-right font-extralight">
              {weatherCodeToString[result.current_weather.weathercode].label}
            </p>
          </div>
        </div>
      </div>
      <div className=" space-y-5 p-3">
        <div className="flex items-center space-x-2 px-4 py-3 rounded-md border border-[#6f90cd] bg-[#2B4879] ">
          <SunIcon className="h-10 w-10 text-white" />
          <div className="flex flex-1 justify-between items-center">
            <p className="font-extralight text-white">Sunrise</p>
            <p className="text-2xl text-white">
              {new Date(result.daily.sunrise[0]).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-3 rounded-md border border-[#6f90cd] bg-[#2B4879] ">
          <MoonIcon className="h-10 w-10 text-white" />
          <div className="flex flex-1 justify-between items-center">
            <p className="font-extralight text-white">Sunset</p>
            <p className="text-2xl text-white">
              {new Date(result.daily.sunset[0]).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
