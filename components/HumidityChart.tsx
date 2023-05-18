import { AreaChart, Card, Text } from "@tremor/react"

type Props = {
  result: Root
}

function HumidityChart({ result }: Props) {
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
    "Humidity (%)": result.hourly.relativehumidity_2m[i],
  }))

  const dataFormatter = (number: number) => `${number} °C`
  return (
    <Card className="my-3">
      <Text>Humidity levels for today</Text>
      <AreaChart
        data={data}
        index="time"
        showLegend
        categories={["Humidity (%)"]}
        colors={["teal"]}
        minValue={0}
        maxValue={100}
        yAxisWidth={40}
      />
    </Card>
  )
}

export default HumidityChart
