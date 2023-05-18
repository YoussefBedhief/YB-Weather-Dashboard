import { AreaChart, Card, Text } from "@tremor/react"

type Props = {
  result: Root
}

function TempChart({ result }: Props) {
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
    "UV Index": result.hourly.uv_index[i],
    "Temperature (C)": result.hourly.temperature_2m[i],
  }))

  const dataFormatter = (number: number) => `${number} °C`
  return (
    <Card className="my-3">
      <Text>Temperature and UV Index in 24H</Text>
      <AreaChart
        data={data}
        index="time"
        showLegend
        categories={["UV Index", "Temperature (C)"]}
        colors={["violet", "rose"]}
        minValue={0}
        yAxisWidth={40}
      />
    </Card>
  )
}

export default TempChart
