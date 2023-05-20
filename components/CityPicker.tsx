"use client"

import { Country, City } from "country-state-city"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Select from "react-select"
import { GlobeIcon, LocationMarkerIcon } from "@heroicons/react/solid"
import { locatedError } from "graphql"

type option = {
  value: {
    latitude: string
    longitude: string
    isoCode: string
  }
  label: string
} | null

type cityOption = {
  value: {
    latitude: string
    longitude: string
    countryCode: string
    name: string
    stateCode: string
  }
  label: string
} | null

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}))

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<option>(null)
  const [selectedCity, setSelectedCity] = useState<cityOption>(null)

  const router = useRouter()

  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option)
    setSelectedCity(null)
  }

  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option)
    router.push(
      `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
    )
  }

  const handleGeoLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const lat = position.coords.latitude
        const long = position.coords.longitude
        const res =
          await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en
        `)
        const data = await res.json()
        router.push(`/location/${data?.city}/${lat}/${long}`)
      })
    } else {
      alert("Geolocation is not supported by this browser")
    }
  }

  return (
    <div className="space-y-4">
      <button
        className="flex justify-center items-center outline-none bg-white text-blue-800 p-5 rounded-xl"
        onClick={handleGeoLocation}
      >
        <LocationMarkerIcon className="w-6 h-6 text-blue-800" />
        Current Location
      </button>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          className="text-black"
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
        />
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="country">City</label>
          </div>
          <Select
            className="text-black"
            value={selectedCity}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((state) => ({
              value: {
                latitude: state.latitude!,
                longitude: state.longitude!,
                countryCode: state.countryCode,
                name: state.name,
                stateCode: state.stateCode,
              },
              label: state.name,
            }))}
          />
        </div>
      )}
    </div>
  )
}
export default CityPicker
