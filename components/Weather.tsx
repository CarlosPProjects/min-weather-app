import { FC } from "react";
import CurrentDay from "./CurrentDay";
import {
  BsCloudDrizzle,
  BsCloud,
  BsClouds,
  BsCloudRain,
  BsCloudSnow,
  BsCloudSun,
  BsCloudFog,
} from "react-icons/bs";

interface WeatherData {
  main: {
    temp: number;
  };
  weather: [
    {
      main: string;
      icon: string;
    }
  ];
  name: string;
}

interface Props {
  data: WeatherData;
}

const Weather: FC<Props> = ({ data }) => {
  let weatherIcon;
  switch (data.weather[0].main) {
    case "Drizzle":
      weatherIcon = <BsCloudDrizzle size={40} />;
      break;
    case "Clouds":
      weatherIcon = <BsClouds size={40} />;
      break;
    case "Rain":
      weatherIcon = <BsCloudRain size={40} />;
      break;
    case "Snow":
      weatherIcon = <BsCloudSnow size={40} />;
      break;
    case "Clear":
      weatherIcon = <BsCloudSun size={40} />;
      break;
    case "Fog":
      weatherIcon = <BsCloudFog size={40} />;
      break;
    default:
      weatherIcon = <BsCloud size={40} />;
      break;
  }
  return (
    <>
      <div className="flex items-end h-full p-8">
        <div className="flex items-end gap-6 p-16">
          <h1 className="text-8xl">{data.main.temp.toFixed(0)}&#176;</h1>
          <div>
            <h2 className="text-5xl">{data.name}</h2>
            <CurrentDay />
          </div>
          <div className="flex flex-col items-center">
            {weatherIcon}
            <span>{data.weather[0].main}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Weather;
