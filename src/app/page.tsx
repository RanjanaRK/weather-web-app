import Nav from "@/components/Nav";
import WeatherCard from "@/components/WeatherCard";

const page = () => {
  return (
    <>
      <Nav />
      <div className="px-6 py-3">
        <WeatherCard />
      </div>
    </>
  );
};

export default page;
