import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import Button from "./Button";
import Loader from "./Loader";
import Weather from "./Weather";
import Header from "./Header";
import styles from "@/styles/Hero.module.css";

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
  const [containerStyle, setContainerStyle] = useState("");
  const [loaderStyles, setLoaderStyle] = useState("");

  const fetchWeather = () => {
    if (city !== "") {
      axios
        .get<WeatherData>(url)
        .then((response) => {
          setWeather(response.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setCity("");
  };

  const handleOnClick = () => {
    fetchWeather();
    setContainerStyle(`${styles.visible}`);
    setLoaderStyle(`${styles.loader}`);
  };

  return (
    <>
      <div className="absolute z-40 hidden sm:block">
        <Header />
      </div>
      <div
        className={`${containerStyle} absolute top-0 left-0 bottom-0 right-0 opacity-0 bg-[url('/assets/rainy-weather.jpg')] bg-cover bg-no-repeat bg-center`}
      >
        <div className="flex flex-row relative justify-end z-10 h-full text-gray-400">
          {/*Weather component, hight details */}
          <div
            className={`${styles.mainInfo} flex-grow -translate-x-full sm:block hidden `}
          >
            {weather && <Weather data={weather} />}
          </div>
          <div
            className={`${styles.aside} relative backdrop-blur pl-8 translate-x-full max-sm:absolute top-0 bottom-0 left-0 right-0`}
          >
            <div className="flex flex-row justify-between gap-8">
              <div className="flex items-end flex-grow">
                <input
                  type="text"
                  placeholder="Another location"
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent outline-none w-full sm:w-72 border-b border-gray-500 pb-2"
                />
              </div>
              <Button
                className="h-20 w-20 grid place-content-center bg-green-200 cursor-pointer"
                onClick={fetchWeather}
              >
                <RiSearchLine size={22} color="#495057" />
              </Button>
            </div>
            {/* Main info, version movil */}
            <div className="pr-8 sm:hidden">
              <div
                className={`${styles.mainInfo} flex-grow -translate-x-full border-b pb-4 border-gray-400`}
              >
                {weather && <Weather data={weather} />}
              </div>
            </div>

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
            <div className="w-full flex justify-center  z-40">
              <Header />
            </div>
          </div>
        </div>
      </div>
      <Loader className={loaderStyles}>
        <div>
          <input
            type="text"
            placeholder="Write your location"
            onChange={(e) => setCity(e.target.value)}
            className="bg-transparent outline-none w-72 border-b border-gray-500 pb-2 text-gray-400"
          />
        </div>
        <Button
          className="grid place-content-center cursor-pointer"
          onClick={handleOnClick}
        >
          <RiSearchLine size={22} color="gray" />
        </Button>
      </Loader>
    </>
  );
};
export default Hero;
