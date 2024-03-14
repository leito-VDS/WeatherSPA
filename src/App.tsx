import { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import { WeatherData, WeekWeatherData } from "./constants";
import Point from "./assets/icons/point";
import "./App.scss";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import D01 from "./assets/icons/01d";
import N01 from "./assets/icons/01n";
import D02 from "./assets/icons/02d";
import N02 from "./assets/icons/02n";
import D03 from "./assets/icons/03d";
import N03 from "./assets/icons/03n";
import D04 from "./assets/icons/04d";
import N04 from "./assets/icons/04n";
import D09 from "./assets/icons/09d";
import N09 from "./assets/icons/09n";
import D10 from "./assets/icons/10d";
import N10 from "./assets/icons/10n";
import D11 from "./assets/icons/11d";
import N11 from "./assets/icons/11n";
import D13 from "./assets/icons/13d";
import N13 from "./assets/icons/13n";
import Graph from "./components/Graph";
import CountUp from "react-countup";
import Sunrise from "./assets/icons/sunrise";
import Sunset from "./assets/icons/sunset";
import Compass from "./assets/icons/compass";

interface OrgData {
    [key: string]: WeatherData[];
}

interface Tp {
    [key: string]: React.FC;
}

const weatherIcons: Tp = {
    "01d": D01,
    "01n": N01,
    "02d": D02,
    "02n": N02,
    "03d": D03,
    "03n": N03,
    "04d": D04,
    "04n": N04,
    "09d": D09,
    "09n": N09,
    "10d": D10,
    "10n": N10,
    "11d": D11,
    "11n": N11,
    "13d": D13,
    "13n": N13,
};

function App() {
    const currTime: string = `${new Date().getHours()}:${new Date().getMinutes()}`;
    const [data, setData] = useState<WeatherData | undefined>();
    const [weekData, setWeekData] = useState<WeekWeatherData | undefined>();
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const handleSelectCity = (city: string) => {
        setSelectedCity(city);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                let currentWeatherResponse, forecastResponse;

                if (selectedCity) {
                    currentWeatherResponse = await axios.get(
                        `${
                            import.meta.env.VITE_API_URL
                        }/weather?q=${selectedCity}&units=metric&appid=${
                            import.meta.env.VITE_API_KEY
                        }`
                    );
                    forecastResponse = await axios.get(
                        `${
                            import.meta.env.VITE_API_URL
                        }/forecast?q=${selectedCity}&units=metric&appid=${
                            import.meta.env.VITE_API_KEY
                        }`
                    );
                } else {
                    const position = await new Promise<GeolocationPosition>(
                        (resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(
                                resolve,
                                reject
                            );
                        }
                    );

                    currentWeatherResponse = await axios.get(
                        `${import.meta.env.VITE_API_URL}/weather?lat=${
                            position.coords.latitude
                        }&lon=${position.coords.longitude}&units=metric&appid=${
                            import.meta.env.VITE_API_KEY
                        }`
                    );
                    forecastResponse = await axios.get(
                        `${import.meta.env.VITE_API_URL}/forecast?lat=${
                            position.coords.latitude
                        }&lon=${position.coords.longitude}&units=metric&appid=${
                            import.meta.env.VITE_API_KEY
                        }`
                    );
                }

                setData(currentWeatherResponse.data);
                setWeekData(forecastResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [selectedCity]);

    function organizeDataByDays(data: WeekWeatherData | undefined) {
        const organizedData: OrgData = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        };

        data?.list.forEach((item) => {
            const date = new Date(item.dt * 1000); // Convert Unix timestamp to milliseconds
            const dayKey: string = daysOfWeek[date.getUTCDay()];

            if (organizedData[dayKey]) {
                organizedData[dayKey].push(item);
            } else {
                console.error(`Invalid day key ${dayKey}`);
            }
        });

        return organizedData;
    }

    function shuffleArray<T>(arr: T[]): T[] {
        const today = new Date().getUTCDay(); // Получаем текущий день недели (0 - воскресенье, 1 - понедельник, и т.д.)
        const shuffledArray = [...arr.slice(today), ...arr.slice(0, today)];
        return shuffledArray;
    }

    function degToCompass(num: number): string {
        const val: number = Math.round(num / 22.5 + 0.5);
        const arr: string[] = [
            "N",
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "S",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW",
        ];
        return arr[val % 16];
    }

    const WeatherIcon = weatherIcons[data ? data.weather[0].icon : "01n"];
    const riseTime = new Date(data ? data.sys.sunrise * 1000 : 0);
    const setTime = new Date(data ? data.sys.sunset * 1000 : 0);

    return data ? (
        <div className="main">
            <div className="left">
                <SearchBar onSelectCity={handleSelectCity} />
                <div className="todayCard">
                    <div className="icon">
                        <WeatherIcon />
                    </div>
                    <div className="degrees">
                        <CountUp end={Math.round(data.main.temp)} />
                        °C
                    </div>
                    <div className="numbers">
                        {daysOfWeek[new Date(data.dt * 1000).getUTCDay()]},{" "}
                        <span>{currTime}</span>
                    </div>
                    <hr></hr>
                    <div className="numbers_bottom">
                        {data.weather[0].description.charAt(0).toUpperCase() +
                            data.weather[0].description.slice(1)}
                    </div>
                    <div className="numbers_bottom">
                        Feels like {Math.round(data.main.feels_like * 10) / 10}
                        °C
                    </div>
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
                    <h2>Future forecast</h2>
                    <div className="cards">
                        {weekData
                            ? shuffleArray(daysOfWeek).map((day) => {
                                  const organizedData =
                                      organizeDataByDays(weekData);

                                  return organizedData[day].length > 2 ? (
                                      <WeatherCard
                                          key={day}
                                          data={organizedData[day]}
                                      />
                                  ) : null;
                              })
                            : "There is no valuable data"}
                    </div>
                    <h2>Today's Highlights</h2>
                    <div className="sixpack">
                        <div className="twowrap">
                            <div className="sixpack_card_sun">
                                <h3>Sunrise & Sunset</h3>
                                <div>
                                    <div className="icon">
                                        <Sunrise width="32px" height="32px" />
                                    </div>
                                    <div className="sign">
                                        <CountUp end={riseTime.getHours()} />:
                                        <CountUp end={riseTime.getMinutes()} />
                                    </div>
                                    AM
                                </div>
                                <div>
                                    <div className="icon">
                                        <Sunset width="32px" height="32px" />
                                    </div>
                                    <div className="sign">
                                        <CountUp end={setTime.getHours()} />:
                                        <CountUp end={setTime.getMinutes()} />
                                    </div>
                                    PM
                                </div>
                            </div>
                            <div className="sixpack_card_wind">
                                <h3>Wind Status</h3>
                                <div>
                                    <span>
                                        <CountUp end={data.wind.speed * 3.6} />{" "}
                                    </span>
                                    km/h
                                </div>
                                <div className="direction">
                                    <Compass width="20px" height="20px" />{" "}
                                    {degToCompass(data.wind.deg)}
                                </div>
                            </div>
                        </div>
                        <div className="sixpack_card_big">
                            <Graph weekData={organizeDataByDays(weekData)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    );
}

export default App;
