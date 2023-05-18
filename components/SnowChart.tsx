import { AreaChart, Card, Text } from "@tremor/react"

type Props = {
  result: Root
}

function SnowChart({ result }: Props) {
  const hourly = result?.hourly.time
    .map((time) =>
      new Date(time).toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24)

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "SnowFall (mm)": result.hourly.snowfall[i],
    "SnowDepth (m)": result.hourly.snow_depth[i],
    "rain (mm)": result.hourly.rain[i],
    "showers (mm)": result.hourly.showers[i],
  }))

  const dataFormatter = (number: number) => `${number} °C`
  return (
    <Card className="my-3">
      <Text>Snow and Rain details</Text>
      <AreaChart
        data={data}
        index="time"
        showLegend
        categories={[
          "SnowFall (mm)",
          "SnowDepth (m)",
          "rain (mm)",
          "showers (mm)",
        ]}
        colors={["slate", "stone", "sky", "blue"]}
        minValue={0}
        yAxisWidth={40}
      />
    </Card>
  )
}

export default SnowChart
