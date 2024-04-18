"use client";
import { useState } from 'react';
import useSWR from 'swr';
import moment from 'moment';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const fetcher = async (url: string): Promise<any> => {
  const response: Response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch');
  }

  return data;
};



export default function Home() {
  const [city, setCity] = useState('San Jose'); // Default city
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;// Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`; 
  const futureApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`

  const { data, error } = useSWR(apiUrl, fetcher);
  const future = useSWR(futureApiUrl, fetcher);
  const forecastdata = future.data

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;
  if (!forecastdata) return <div>Loading...</div>;
  console.log(data)
  console.log(forecastdata)

  function tempForecast (params : number) {
    var multi = params
    var midday = data.sys.sunset - ((data.sys.sunset - data.sys.sunrise) / 4)
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
    

  return (
    <main>
      <div>
        <Card className="flex flex-col justify-between bg-gradient-to-b from-blue-600 to-blue-300">
          <CardHeader>
            <div className="flex flex-col items-center">
              <CardTitle className="text-white text-4xl"> {city} </CardTitle>
              <CardDescription className="text-white"> {moment().format('LL')} </CardDescription>   
              <img src="/images/sun.png" alt="Sun" className="w-48 h-48" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <p className="text-2xl"> {Math.round(data.main.temp)}° </p>
              <CardDescription className="text-black text-lg text-white"> {data.weather[0].description} </CardDescription>
            </div>
          </CardContent>
          <div className="flex flex-col items-center">
            <CardFooter>
              <div className="grid grid-rows-5 gap-4">
                <div className="grid grid-cols-3 gap-80">
                  <p>{dayName(forecastdata.list[8].dt)}</p>
                  <p>{weatherForecast(8)}</p>
                  <p>{tempForecast(0)}</p>
                </div>
                <div className="grid grid-cols-3 gap-80">
                  <p>{dayName(forecastdata.list[16].dt)}</p>
                  <p>{weatherForecast(16)}</p>
                  <p>{tempForecast(1)}</p>
                </div>
                <div className="grid grid-cols-3 gap-80">
                  <p>{dayName(forecastdata.list[24].dt)}</p>
                  <p>{weatherForecast(24)}</p>
                  <p>{tempForecast(2)}</p>
                </div>
                <div className="grid grid-cols-3 gap-80">
                  <p>{dayName(forecastdata.list[32].dt)}</p>
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
