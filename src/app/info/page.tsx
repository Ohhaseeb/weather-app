'use client'
import {useSearchParams} from 'next/navigation';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter } from '@/components/ui/card';
import TemperatureToggle from '@/components/ui/tempswitch';
import { getData, getFuture, getSunrise, getTime, titleCase } from '@/lib/pgutil';
import Search from '@/components/ui/search';
import { SetStateAction, useState } from 'react';
import Link from 'next/link';


export default function Info() {
  const received = useSearchParams()
  const [city, setCity] = useState(received.get('city'))
  const [temp, setTemp] = useState(received.get('format'))
  const data = getData(city, temp)
  const forecast = getFuture(city, temp)

  
  const handleSearch: any = (query: string) => {
    if (!query) {
      return (
        <div>
          <Search onSearch={handleSearch} />
          City not Found
        </div>
      );
    } else {
      setCity(query);
    }
  }

 
  if (!data) return <div> <Search onSearch={handleSearch}/> City not Found</div>;
  if (!forecast) return <div> <Search onSearch={handleSearch}/> City not Found</div>;
  if (!temp) return <div><Search onSearch={handleSearch}/> City Not Found</div>
  console.log(data)

  
  const format = {
    bgcolor: "from-blue-600 to-blue-300",
    img: "/images/sun.png"
   }
   if (forecast.list[0].sys.pod == 'n') {
      format.bgcolor = "from-black to-slate-600"
      format.img = "/images/moon.png"
   }

   function getCardinalDirection(degrees: number) {
    const cardinalDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const index = Math.round((degrees % 360) / 45);
    return cardinalDirections[index];
  }

  function getUnit(unit: string) {
    var ret = ''
    if (unit == 'imperial') {
      ret = 'mph'
    } else {
      ret = 'm/s'
    }
    return ret
  }

  const dataToSend = {
    city: city,
    format: temp
  };

  const handleToggle = (format: string) => {
    setTemp(format);
  };
  


    return (
        <main>
          
            <div>
              <Search onSearch={handleSearch} />
            </div>
            <div>
              <Card className={`flex flex-col justify-between bg-gradient-to-b ${format.bgcolor}`}>
                <div className='grid grid-rows-2 gap-4'>
                  <div className='text-white translate-y-2'>
                    <Link href={{pathname:'/', query: dataToSend}} className='className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                      Back Home
                    </Link>
                  </div>
                  <div>
                  <TemperatureToggle temperatureFormat={temp} onToggle={handleToggle} />
                  </div>
                </div>
                <div className="animate__animated animate__fadeIn animate__fast">
                  <div className='flex flex-row gap-20'>
                    <div>
                      <CardHeader>
                        <div className="flex flex-col">
                          <CardTitle className="text-white text-6xl"> {titleCase(data.name)} </CardTitle>
                          <CardDescription className="text-white "> {new Date(getTime(data.timezone)).toLocaleDateString("en-US", {weekday: 'long',year: 'numeric', month: 'long', day: 'numeric'})} </CardDescription>  
                          <p>{new Date(getTime(data.timezone)).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</p> 
                          <img src={format.img} alt="Sun" className="w-48 h-48" />
                        </div>
                      </CardHeader>
                    </div>
                  <CardContent>
                    <div className="flex flex-col translate-y-10 bg-black bg-opacity-15 p-8 rounded-lg">
                      <p className="text-7xl"> {Math.round(data.main.temp)}° </p>
                      <CardDescription className="text-white text-xl"> {titleCase(data.weather[0].description)} </CardDescription>
                      <p className="text-xl"> Feels Like: {Math.round(data.main.feels_like)}°</p>
                      <p className="text-xl"> Max - {Math.round(data.main.temp_max)}° | Min - {Math.round(data.main.temp_min)}°</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className='grid grid-rows-5 gap-4 text-xl'>
                        <div className='grid grid-cols-2 gap-10'>
                          <p>Humidity:</p>
                          <p>{data.main.humidity} %</p>
                        </div>
                        <div className='grid grid-cols-2 gap-10'>
                          <p>Visibility:</p>
                          <p>{data.visibility/1000} km</p>
                        </div>
                        <div className='grid grid-cols-2 gap-10'>
                          <p>Wind:</p>
                          <p>{data.wind.speed}{getUnit(temp)} {getCardinalDirection(data.wind.deg)}</p>
                        </div>
                        <div className='grid grid-cols-2 gap-10'>
                          <p>Sunrise:</p>
                          <p>{new Date(getSunrise(data.timezone, data.sys.sunrise)).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                        <div className='grid grid-cols-2 gap-10'>
                          <p>Sunset:</p>
                          <p>{new Date(getSunrise(data.timezone, data.sys.sunset)).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </div>
        </main>
        
    
       
      );
}