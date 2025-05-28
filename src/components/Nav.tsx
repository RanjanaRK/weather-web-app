import ThemeToggle from "./ThemeToggle";

const Nav = () => {
  return (
    <nav className="z-30 px-6 py-2 shadow">
      <div className="flex items-center justify-between">
        {/* <h1 className=" text-xl font-bold">Weather App</h1> */}
        <h1 className="text-3xl font-bold">Weather App 🌦</h1>
        <div className="space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
