import { SunIcon } from "@heroicons/react/outline"
import { Card, Color, Metric, Text } from "@tremor/react"

type Props = {
  title: string
  metric: string
  color?: Color
}

function StatCard({ title, metric, color }: Props) {
  return (
    <Card
      decoration="top"
      decorationColor={color}
      className="flex items-center space-x-5"
    >
      <div>
        <Text> {title} </Text>
        <Metric> {metric} </Metric>
      </div>
    </Card>
  )
}

export default StatCard
