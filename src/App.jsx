import React, { useState } from "react";
import Search from "./Components/search";
import Lottie from "lottie-react";
import Cr from "./assets/cerah.json";
import Hp from "./assets/hujanpetir.json";
import Br from "./assets/berawan.json";
import "./index.css";

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [displayWeather, setDisplayWeather] = useState(false);

  const fetchWeatherData = (cityName) => {
    const fetchData = async () => {
      if (cityName) {
        try {
          const apiKey = "8f71d925b6eaba39106e2228618cbf5b";
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          setDisplayWeather(true);
          console.log(data);
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    const timeoutId = setTimeout(fetchData, 1000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="kartu container mx-auto flex px-5 py-10 items-center justify-center flex-col w-[450px] bgcuaca border-solid border-b-slate-500 shadow-xl shadow-black rounded-xl border">
          <div className=" mb-5">
            <Search onCityChange={fetchWeatherData} />
          </div>
          {displayWeather ? (
            <>
              {weatherData && (
                <>
                  <div>
                    {weatherData.weather ? (
                      <>
                        {weatherData.weather[0].main === "Clouds" ? (
                          <Lottie animationData={Br} />
                        ) : null}
                        {weatherData.weather[0].main === "Rain" ? (
                          <>
                            <Lottie animationData={Hp} />
                          </>
                        ) : null}
                        {weatherData.weather[0].main === "Clear" ? (
                          <>
                            <Lottie animationData={Cr} />
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                  <div className=" flex flex-col lg:w-2/3 w-full">
                    <div>
                      <>
                        <h1 className=" text-blue-950 text-start font-mono text-2xl ">
                          {weatherData.name}
                        </h1>
                      </>
                    </div>
                    <div>
                      {weatherData.main ? (
                        <>
                          <h1 className="  text-blue-950 text-center font-mono text-6xl my-3">
                            {weatherData.main.temp}°C
                          </h1>
                        </>
                      ) : null}
                    </div>

                    <div>
                      {weatherData.weather ? (
                        <h1 className=" text-blue-950 text-end font-mono text-2xl">
                          {weatherData.weather[0].main}
                        </h1>
                      ) : null}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className=" my-48">
                <h1 className=" text-2xl text-blue-950">SEARCH COUNTRY'S WEATHER</h1>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
