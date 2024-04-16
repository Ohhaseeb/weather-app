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

  const { data, error } = useSWR(apiUrl, fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;
  console.log(data)

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
