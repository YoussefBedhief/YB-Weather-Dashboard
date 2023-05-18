import { getClient } from "@/apollo-client"
import CalloutCard from "@/components/CalloutCard"
import HumidityChart from "@/components/HumidityChart"
import RainChart from "@/components/RainChart"
import SideBar from "@/components/SideBar"
import SnowChart from "@/components/SnowChart"
import StatCard from "@/components/StatCard"
import TempChart from "@/components/TempChart"
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries"

export const revalidate = 60

type Props = {
  params: {
    city: string
    lat: string
    long: string
  }
}

async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient()

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      latitude: lat,
      longitude: long,
      timezone: "auto",
    },
  })

  const result: Root = data.myQuery
  return (
    <div className="flex flex-col min-h-screen md:flex-row ">
      <SideBar city={city} lat={lat} long={long} result={result} />
      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold ">Todays Overview</h2>
            <p className="text-sm">
              Last updated at :{" "}
              {new Date(result.current_weather.time).toLocaleString()} (
              {result.timezone})
            </p>
          </div>

          <div className="mb-10 m-2">
            <CalloutCard message="This is where a description is comming" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Max Temprature"
              metric={`${result.daily.temperature_2m_max[0].toFixed(1)}°C`}
              color="red"
            />
            <StatCard
              title="Min Temprature"
              metric={`${result.daily.temperature_2m_min[0].toFixed(1)}°C`}
              color="blue"
            />
            <div className="space-y-3">
              <StatCard
                title="UV Index"
                metric={result.daily.uv_index_max[0].toFixed(1)}
                color="violet"
              />

              {Number(result.daily.uv_index_max[0].toFixed(1)) >= 6 && (
                <CalloutCard
                  warning
                  message="Be carefull the UV is high today, make sure to protect yourself from sun exposure"
                />
              )}
            </div>
            <div className="flex space-x-3 ">
              <StatCard
                title="Wind Speed"
                metric={`${result.current_weather.windspeed.toFixed(1)}km/h`}
                color="cyan"
              />

              <StatCard
                title="Win direction"
                metric={`${result.current_weather.winddirection.toFixed(1)}°`}
                color="indigo"
              />
            </div>
          </div>
        </div>
        <hr className="mb-5" />
        <div>
          <TempChart result={result} />
          <RainChart result={result} />
          <HumidityChart result={result} />
          <SnowChart result={result} />
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
