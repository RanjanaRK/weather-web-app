"use client";

import { getForecast, getWeather } from "@/hooks/fetchWeather";
import { WeatherData } from "@/lib/types";
import {
  ArrowUp,
  Droplets,
  LocationEditIcon,
  Search,
  ThermometerIcon,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";
import ForecastData from "./ForecastData";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";

const WeatherCard = () => {
  const [weather, setWeather] = useState<any>("");
  const [forecastData, setForecastData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
  const [liveLocation, setLiveLocation] = useState(false);
  const [expandedDay, setExpandedDay] = useState<any>(null);

  useEffect(() => {
    const loadDefaultWeather = async () => {
      const data = await getWeather("Kolkata");
      //   console.log(data);
      setWeather(data);
    };

    loadDefaultWeather();
  }, []);

  useEffect(() => {
    const fetchForecast = async () => {
      const data = await getForecast("kolkata");
      setForecastData(data ?? null);
      setExpandedDay(data?.forecast.forecastday[0].date);
    };
    fetchForecast();
  }, []);

  const handleSearch = async () => {
    if (!city) return;
    setLiveLocation(false);
    const data = await getWeather(city);
    setWeather(data);
    setCity("");
  };

  useEffect(() => {
    if (liveLocation && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const data = await getWeather(`${latitude},${longitude}`);
        setWeather(data);
      });
    }
  }, [liveLocation]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!liveLocation) {
        const data = await getWeather("Kolkata");
        setWeather(data);
      }
    };
    fetchWeather();
  }, [liveLocation]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="relative right-0 w-64 rounded border p-2 pl-12"
          />
          <Button onClick={handleSearch} className="absolute">
            <Search />
          </Button>
        </div>
        <div className="items-center gap-0.5 sm:flex">
          <h1>Current Location</h1>
          <Switch
            id="airplane-mode"
            checked={liveLocation}
            onCheckedChange={setLiveLocation}
          />
        </div>
      </div>
      {/* default Location */}
      <div className="flex flex-col">
        <div className="space-y-6 py-6 md:flex md:h-[50dvh] md:justify-between">
          <div className="flex justify-between md:flex-col">
            <div className="flex gap-3">
              <LocationEditIcon />
              <div className="">
                <h1 className="mb-6 text-2xl font-bold">
                  {weather.location?.country}, {weather.location?.name}
                </h1>
                <div className="text-xl">
                  {new Date().toLocaleDateString("en-US", {
                    dateStyle: "medium",
                  })}
                </div>
                <div className="text-xl">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                  })}{" "}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <ThermometerIcon /> Feels like{" "}
              {Math.round(weather?.current?.feelslike_c)}°C
            </div>
          </div>
          <div className="grid h-full place-items-center">
            <div className="text-8xl">
              {Math.round(weather?.current?.temp_c)}°C
            </div>
            <div className="text-2xl">{weather.current?.condition?.text}</div>
          </div>
          <div className="flex flex-col space-y-4 py-6">
            <span className="flex gap-2">
              <Droplets /> {weather.current?.precip_mm} mm
            </span>
            <span className="flex gap-2">
              <Wind />
              {weather.current?.wind_kph} km/h
            </span>
            <span className="flex gap-2">
              <ArrowUp />
              {weather.current?.pressure_mb} mb
            </span>
          </div>
        </div>
      </div>

      {/* forecast weather */}
      <div className="">
        <span className="text-2xl font-bold">Forecast</span>
        <div>
          {forecastData?.forecast?.forecastday?.length ? (
            <div className="relative grid grid-cols-3 gap-3">
              {forecastData.forecast.forecastday.map((wFData) => {
                return (
                  <ForecastData
                    key={wFData.date}
                    wData={wFData}
                    isExpanded={expandedDay === wFData.date}
                    onSelect={(date: string) => setExpandedDay(date)}
                  />
                );
              })}
            </div>
          ) : (
            <p>Loading or no data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
