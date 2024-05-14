"use client";
import { SetStateAction, useEffect, useState } from 'react';
import Search from '@/components/ui/search';
import TemperatureToggle from '@/components/ui/tempswitch';
import Link from 'next/link';
import '@/lib/utils'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getData, getFuture, getTime, titleCase } from '@/lib/pgutil';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  
  const received = useSearchParams()
  const [city, setCity] = useState('San Jose'); // Default city
  const [temperatureFormat, setTemperatureFormat] = useState('imperial')
  const tempC = received.get('city')
  const form = received.get('format')

  const handleToggle = (format: string) => {
    setTemperatureFormat(format);
  };

if (tempC != null && form != null) {
    useEffect(() => {
      if (typeof window !== "undefined") {
          setCity(tempC)
          setTemperatureFormat(form)
      } else console.log('window.location is UNDEFINED')
  }, [window]);
}

    const data = getData(city, temperatureFormat)
    const forecastdata = getFuture(city, temperatureFormat)

    const handleSearch = (query: SetStateAction<string>) => {
      if (!query) return <div> <Search onSearch={handleSearch}/> City not Found</div>;
      else setCity(query)
    }

    if (!data) return <div> <Search onSearch={handleSearch}/> City not Found</div>;
    if (!forecastdata) return <div> <Search onSearch={handleSearch}/> City not Found</div>;
    console.log(forecastdata)
    console.log(data)


  function tempForecast (params : number) {
    var multi = params
    var midday = data.sys.sunset - ((data.sys.sunset - data.sys.sunrise) / 2.5)
    if (data.dt < midday) {
      multi += 1;
    }
    
    var max = 0;
    var min = 999
      for (var i = 0; i < 8; i++) {
        var g = i + (multi * 8)
        if (forecastdata.list[g].main.temp > max) {
          max = forecastdata.list[g].main.temp
        }
        if (forecastdata.list[g].main.temp < min) {
          min = forecastdata.list[g].main.temp
        }
      }
    return `${Math.round(max)}°  |  ${Math.round(min)}°`
  }

  function weatherForecast (params : number) {
    return forecastdata.list[params].weather[0].main
  }

  function dayName (date : number) {
    let dateTime = new Date(date * 1000 + (data.timezone * 1000));

    // Convert into 24-hour format
    let weekday = dateTime.toLocaleString('default', { weekday: 'long' });
    
    return `${weekday}`
  }

 const format = {
  bgcolor: "from-blue-600 to-blue-300",
  img: "/images/sun.png"
 }
 if (forecastdata.list[0].sys.pod == 'n') {
    format.bgcolor = "from-black to-slate-600"
    format.img = "/images/moon.png"
 }

 const dataToSend = {
  city: city,
  format: temperatureFormat
};

  

  return (
    <main>
      <div>
        <Search onSearch={handleSearch} />
      </div>
      <div>
        <Card className={`flex flex-col justify-between bg-gradient-to-b ${format.bgcolor}`}>
          <div>
            <TemperatureToggle temperatureFormat={temperatureFormat} onToggle={handleToggle} />
          </div>
          
          <CardHeader>
            <div className="flex flex-col items-center">
              <CardTitle className="text-white text-4xl"> {titleCase(data.name)} </CardTitle>
              <div className="text-white text-center translate-y-1">
                {/* Use Next.js Link component to navigate to the next page */}
                <Link href={{pathname:'/info', query: dataToSend}} className='className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Get Today's Info
                </Link>
              </div>
              <CardDescription className="text-white"> {new Date(getTime(data.timezone)).toLocaleDateString("en-US", {weekday: 'long',year: 'numeric', month: 'long', day: 'numeric'})} </CardDescription>  
              <p>{new Date(getTime(data.timezone)).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</p> 
              <img src={format.img} alt="Sun" className="w-48 h-48" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <p className="text-2xl"> {Math.round(data.main.temp)}° </p>
              <CardDescription className="text-white text-lg"> {data.weather[0].description} </CardDescription>
            </div>
          </CardContent>
          <div className="flex flex-col items-center">
            <div className="text-2xl -translate-y-2">
              <p>4-Day Forecast</p>
            </div>
            <CardFooter>
              <div className="grid grid-rows-5 gap-4 text-xl">
                <div className="grid grid-cols-3 gap-60">
                  <p>{dayName(forecastdata.list[9].dt)}</p>
                  <p>{weatherForecast(8)}</p>
                  <p>{tempForecast(0)}</p>
                </div>
                <div className="grid grid-cols-3 gap-60">
                  <p>{dayName(forecastdata.list[17].dt)}</p>
                  <p>{weatherForecast(16)}</p>
                  <p>{tempForecast(1)}</p>
                </div>
                <div className="grid grid-cols-3 gap-60">
                  <p>{dayName(forecastdata.list[25].dt)}</p>
                  <p>{weatherForecast(24)}</p>
                  <p>{tempForecast(2)}</p>
                </div>
                <div className="grid grid-cols-3 gap-60">
                  <p>{dayName(forecastdata.list[33].dt)}</p>
                  <p>{weatherForecast(32)}</p>
                  <p>{tempForecast(3)}</p>
                </div>
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>
    </main>
    

   
  );
}
