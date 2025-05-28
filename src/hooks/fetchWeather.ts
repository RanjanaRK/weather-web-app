import { WeatherData } from "@/lib/types";
import ky from "ky";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getWeather = async (city: any) => {
  try {
    return await ky
      .get(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}`)
      .json();
  } catch (error) {
    console.error("Error fetching current weather:", error);
  }
};

export const getForecast = async (city: string) => {
  try {
    return await ky
      .get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=3`)
      .json<WeatherData>();
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
  }
};
