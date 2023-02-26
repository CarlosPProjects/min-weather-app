import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import Button from "./Button";
import Weather from "./Weather";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  weather: [
    {
      main: string;
      icon: string;
    }
  ];
  name: string;
}

const Hero = () => {
  const API = process.env.NEXT_PUBLIC_WEATHER_KEY;
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`;

  const fetchWeather = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (city !== "") {
      axios
        .get<WeatherData>(url)
        .then((response) => {
          setWeather(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLoading(false);
    }

    setCity("");
  };

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0">
      <Image
        src="/assets/cloudy-weather.jpg"
        fill={true}
        className="object-cover"
        alt="weather background"
      />
      {/*Weather container*/}
      <div className="flex flex-row relative justify-end z-10 h-full text-gray-400">
        {/*Weather component, hight details */}
        <div className="flex-grow">{weather && <Weather data={weather} />}</div>
        <div className="relative backdrop-blur pl-8">
          <form onSubmit={fetchWeather} className="">
            <div className="flex flex-row gap-8">
              <div className="flex items-end">
                <input
                  type="text"
                  placeholder="Another location"
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent outline-none w-72 border-b border-gray-500 pb-2"
                />
              </div>
              <Button
                className="h-20 w-20 grid place-content-center bg-green-200 cursor-pointer"
                onClick={fetchWeather}
              >
                <RiSearchLine size={22} color="#495057" />
              </Button>
            </div>
          </form>
          {/*Weather, more information about the current location */}
          <div className="flex flex-col py-8 pr-8">
            <h2 className="font-semibold text-gray-50">Weather Details</h2>
            <div className="flex flex-col gap-4 py-8 border-gray-400 border-b">
              <div className="flex justify-between">
                <h3>Cloudy</h3>
                <span>{weather?.clouds.all}%</span>
              </div>
              <div className="flex justify-between">
                <h3>Humidity</h3>
                <span>{weather?.main.humidity.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <h3>Wind</h3>
                <span>{weather?.wind.speed.toFixed(0)}km/h</span>
              </div>
              <div className="flex justify-between">
                <h3>Temp. Max</h3>
                <span>{weather?.main.temp_max.toFixed(0)}&#176;</span>
              </div>
              <div className="flex justify-between">
                <h3>Temp. Min</h3>
                <span>{weather?.main.temp_min.toFixed(0)}&#176;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
