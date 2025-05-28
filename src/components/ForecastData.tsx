"use client";

const ForecastData = ({ wData, isExpanded, onSelect }: any) => {
  const getDayName = (dateStr: string, locale: string = "en-US"): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  };

  const getHourTime = (timeStr: string, locale: string = "en-US"): string => {
    const isoString = timeStr.replace(" ", "T");
    const dateObj = new Date(isoString);
    return dateObj.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="">
        <div
          onClick={() => onSelect(wData.date)}
          className={`cursor-pointer rounded border p-3 shadow backdrop-blur-lg transition-colors duration-300 ${isExpanded ? "bg-foreground/10" : "bg-background"}`}
        >
          <p className="">
            {wData.date}
            <span className="font-semibold"> {getDayName(wData.date)}</span>
          </p>
          <p>
            <span className="font-bold"> {wData.day.avgtemp_c}°C</span> ({" "}
            {wData.day.maxtemp_c}°C / {wData.day.mintemp_c}°C){" "}
          </p>
          <div className="">{wData.day?.condition?.text}</div>

          <p className="text-sm"></p>
        </div>

        {/* Hourly Forecast */}

        {isExpanded && (
          <div className="absolute left-0 grid w-full grid-cols-3 gap-2 py-4 sm:grid-cols-6 md:grid-cols-12">
            {wData.hour.map((hour: any) => (
              <div
                key={hour.time_epoch}
                className="rounded border p-2 text-center"
              >
                <p className="text-sm font-medium">{getHourTime(hour.time)}</p>
                <p className="text-sm">{hour.temp_c}°C</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ForecastData;
