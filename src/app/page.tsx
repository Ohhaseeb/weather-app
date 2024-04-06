import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export default function Home() {
  return (
    <main>
      <div>
        <Card className="flex flex-col justify-between bg-gradient-to-b from-blue-600 to-blue-300">
          <CardHeader>
            <div className="flex flex-col items-center">
              <CardTitle> San Jose </CardTitle>
              <CardDescription className="text-black"> April 5th, 2024 </CardDescription>
              <img src="/images/sun.png" alt="Sun" className="w-48 h-48" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <p className="text-xl"> 11°C </p>
              <CardDescription className="text-black text-lg"> Clear </CardDescription>
            </div>
          </CardContent>
          <div className="flex flex-col items-center">
            <CardFooter>
              <div className="grid grid-rows-5 gap-4">
                <div className="grid grid-cols-3 gap-80">
                  <p>Monday</p>
                  <p>Sunny</p>
                  <p>24°C</p>
                </div>
                <div className="grid grid-cols-3 gap-80">
                  <p>Tuesday</p>
                  <p>Cloudy</p>
                  <p>20°C</p>
                </div>
                <div className="grid grid-cols-3 gap-80">
                  <p>Wednesday</p>
                  <p>Rainy</p>
                  <p>18°C</p>
                </div>
                <div className="grid grid-cols-3 gap-80">
                  <p>Thursday</p>
                  <Avatar>
                    <AvatarImage src="/images/sun.png" />
                  </Avatar>
                  <p>70°C</p>
                </div>
                <div className="grid grid-cols-3 gap-80">
                  <p>Friday</p>
                  <p>Partly</p>
                  <p>22°C</p>
                </div>
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>
    </main>
  );
}
