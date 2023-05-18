import CityPicker from "@/components/CityPicker"
import { Card, Text, Subtitle, Divider } from "@tremor/react"

export default function Home() {
  return (
    <main className="min-h-screen p-10 flex flex-col justify-center items-center">
      <Card className="max-w-4xl mx-auto">
        <Text className="text-6xl font-bold text-center mb-2 ">
          YB Weather App
        </Text>
        <Subtitle className="text-xl text-center ">
          Developed with Nextjs 13, tailwindCSS, tremor2.0 and + More!
        </Subtitle>
        <Divider className="my-10" />
        <Card className="bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
          <CityPicker />
        </Card>
      </Card>
    </main>
  )
}
