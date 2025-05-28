type Astro = {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
};

type HourlyForecast = {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
};

type DailyForecast = {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
  };
  astro: Astro;
  hour: HourlyForecast[];
};

export type WeatherData = {
  forecast: {
    forecastday: DailyForecast[];
  };
};
