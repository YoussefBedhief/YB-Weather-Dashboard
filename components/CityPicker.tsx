"use client"
import Select from "react-select"
import { Country, City } from "country-state-city"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlobeIcon } from "@heroicons/react/solid"

type CoutryOption = {
  value: {
    latitude: string
    longitude: string
    isoCode: string
  }
  label: string
} | null
type CityOption = {
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
  const [selectedCountry, setSelectedCountry] = useState<CoutryOption>(null)
  const [selectedCity, setSelectedCity] = useState<CityOption>(null)
  const router = useRouter()

  const handleSelectedCountry = (option: CoutryOption) => {
    setSelectedCountry(option)
    setSelectedCity(null)
  }
  const handleSelectedCity = (option: CityOption) => {
    setSelectedCity(option)
    router.push(
      `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
    )
  }
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80 text-white">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="Country">Country</label>
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
          <div className="flex items-center space-x-2 text-white/80 text-white">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="City">City</label>
          </div>
          <Select
            className="text-black"
            value={selectedCity}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((city) => ({
              value: {
                latitude: city.latitude,
                longitude: city.longitude,
                countryCode: city.countryCode,
                name: city.name,
                stateCode: city.stateCode,
              },
              label: city.name,
            }))}
          />
        </div>
      )}
    </div>
  )
}

export default CityPicker
