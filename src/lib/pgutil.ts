import useSWR from "swr";

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

const fetcher = async (url: string): Promise<any> => {
    const response: Response = await fetch(url);
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch');
    }
  
    return data;
  };

export const getData: any = (city: string, format: string) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${format}`; 
    const { data, error } = useSWR(apiUrl, fetcher);

    return data
}

export const getFuture: any = (city: string, format: string) => {
    const futureApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${format}`;
    const {data, error} = useSWR(futureApiUrl, fetcher);

    return data
}

export const getTime: any = (timezone:any) => {
    const d = new Date()
    const localTime = d.getTime()
    const localOffset = d.getTimezoneOffset() * 60000
    const utc = localTime + localOffset
    var time = utc + (1000 * timezone)
    return time
  }

  export const getSunrise: any = (timezone:any, time:any) => {
    const d = new Date()
    const localTime = time * 1000
    const localOffset = d.getTimezoneOffset() * 60000
    const utc = localTime + localOffset
    var sunrise = utc + (1000 * timezone)
    console.log(sunrise - d.getTime())
    return sunrise
  }

export function titleCase(str: string) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }
