import React from "react";
import { WeatherData } from "../../constants";
import styles from "./WeatherCard.module.scss";
import D01 from "../../assets/icons/01d";
import N01 from "../../assets/icons/01n";
import D02 from "../../assets/icons/02d";
import N02 from "../../assets/icons/02n";
import D03 from "../../assets/icons/03d";
import N03 from "../../assets/icons/03n";
import D04 from "../../assets/icons/04d";
import N04 from "../../assets/icons/04n";
import D09 from "../../assets/icons/09d";
import N09 from "../../assets/icons/09n";
import D10 from "../../assets/icons/10d";
import N10 from "../../assets/icons/10n";
import D11 from "../../assets/icons/11d";
import N11 from "../../assets/icons/11n";
import D13 from "../../assets/icons/13d";
import N13 from "../../assets/icons/13n";

interface Tp {
    [key: string]: React.FC<{ style?: React.CSSProperties }>;
}

const weatherIcons: Tp = {
    "01d": ({ style }) => <D01 style={style} />,
    "01n": ({ style }) => <N01 style={style} />,
    "02d": ({ style }) => <D02 style={style} />,
    "02n": ({ style }) => <N02 style={style} />,
    "03d": ({ style }) => <D03 style={style} />,
    "03n": ({ style }) => <N03 style={style} />,
    "04d": ({ style }) => <D04 style={style} />,
    "04n": ({ style }) => <N04 style={style} />,
    "09d": ({ style }) => <D09 style={style} />,
    "09n": ({ style }) => <N09 style={style} />,
    "10d": ({ style }) => <D10 style={style} />,
    "10n": ({ style }) => <N10 style={style} />,
    "11d": ({ style }) => <D11 style={style} />,
    "11n": ({ style }) => <N11 style={style} />,
    "13d": ({ style }) => <D13 style={style} />,
    "13n": ({ style }) => <N13 style={style} />,
};

interface WeatherCardProps {
    data: WeatherData[];
}

function WeatherCard({ data }: WeatherCardProps): JSX.Element {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let maxTemp: number = data[0].main.temp;
    let minTemp: number = data[0].main.temp;

    // Iterate through the array starting from the second item
    for (let i = 1; i < data.length; i++) {
        const temp = data[i].main.temp;
        
        // Update max and min values
        if (temp > maxTemp) {
            maxTemp = temp;
        }

        if (temp < minTemp) {
            minTemp = temp;
        }
    }

    const scaleValue = 1; // Adjust the scale value as needed

    const WeatherIcon = weatherIcons[data.length > 4 ? data[4].weather[0].icon : data[data.length - 1].weather[0].icon];
    const id = Math.floor(data.length / 2);
    return (
        <div className={styles.cardWrapper}>
            <h2>{daysOfWeek[new Date(data[0].dt * 1000).getUTCDay()]}</h2>
            <div className={styles.dataList}>
                <div className={styles.extendedData}>
                    <span>Temp: {Math.round(data[id].main.temp * 10) / 10}°</span>
                    <span>Feels: {Math.round(data[id].main.feels_like * 10) / 10}°</span>
                    <span>Hum: {Math.round(data[id].main.humidity)}%</span>
                    <span>Weather: {data[id].weather[0].description}</span>
                </div>
                <div className={styles.mainData}>
                    <div className={styles.icon}>
                        <WeatherIcon style={{ transform: `scale(${scaleValue})`, width: "80px", height: "80px"}} />
                    </div>
                    <div>{Math.round(maxTemp * 10) / 10}° <span>{Math.round(minTemp * 10) / 10}°</span></div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
