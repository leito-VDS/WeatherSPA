import { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import { WeatherData, WeekWeatherData } from "./constants";
import Point from "./assets/icons/point";
import D01 from "./assets/icons/01d";
import "./App.scss";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import CountUp from 'react-countup';

function App() {
    const [data, setData] = useState<WeatherData | undefined>();
    const [weekData, setWeekData] = useState<WeekWeatherData | undefined>();
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const handleSelectCity = (city: string) => {
        setSelectedCity(city);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                let response;
                if (selectedCity) {
                    // If a city is selected, fetch weather data for that city
                    response = await axios.get(
                        `${
                            import.meta.env.VITE_API_URL
                        }/weather?q=${selectedCity}&units=metric&appid=${
                            import.meta.env.VITE_API_KEY
                        }`
                    );
                } else {
                    // Otherwise, use geolocation to get the current location's weather
                    const position = await new Promise<GeolocationPosition>(
                        (resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(
                                resolve,
                                reject
                            );
                        }
                    );
                    console.log(position.coords.latitude);
                    response = await axios.get(
                        `${import.meta.env.VITE_API_URL}/weather?lat=${
                            position.coords.latitude
                        }&lon=${position.coords.longitude}&units=metric&appid=${
                            import.meta.env.VITE_API_KEY
                        }`
                    );
                }

                setData(response.data);

                // Fetch week forecast data
                response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/forecast?q=${
                        selectedCity || "Moscow"
                    }&units=metric&appid=${import.meta.env.VITE_API_KEY}`
                );

                setWeekData(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
        console.log(data);
    }, [selectedCity]); // Add selectedCity as a dependency to rerun the effect when it changes

    return data ? (
        <div className="main">
            <div className="left">
                <SearchBar onSelectCity={handleSelectCity} />
                <div className="todayCard">
                    <div className="icon">
                        <D01 width="160px" height="160px" />
                    </div>
                    <div className="degrees"><CountUp end={data.main.temp}/></div>
                    {/* <div className="degrees">{Math.round(data.main.temp)}°</div> */}
                    <div>Monday</div>
                    <hr></hr>
                    <div>Smudge</div>
                    <div>30% humidity</div>

                </div>
                <div className="position">
                    <Point width="16px" height="16px" />
                    <div style={{ height: "fit-content" }}>
                        {data.name}, <span>{data.sys.country}</span>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="wrapper">
                    <div className="cards">
                        <WeatherCard data={data} />
                        <WeatherCard data={data} />
                        <WeatherCard data={data} />
                        <WeatherCard data={data} />
                        <WeatherCard data={data} />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    );
}

export default App;
