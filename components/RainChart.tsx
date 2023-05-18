import { AreaChart, Card, Text } from "@tremor/react"

type Props = {
  result: Root
}

function RainChart({ result }: Props) {
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
    "Rain (%)": result.hourly.precipitation_probability[i],
  }))

  const dataFormatter = (number: number) => `${number} °C`
  return (
    <Card className="my-3">
      <Text>Probability of raining today</Text>
      <AreaChart
        data={data}
        index="time"
        showLegend
        categories={["Rain (%)"]}
        colors={["blue"]}
        minValue={0}
        maxValue={100}
        yAxisWidth={40}
      />
    </Card>
  )
}

export default RainChart
