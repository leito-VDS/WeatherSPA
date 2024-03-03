export interface WeatherData {
    base: string;
    clouds: {
        all: number;
    };
    cod: number;
    coord: {
        lon: number;
        lat: number;
    };
    dt: number;
    dt_txt: string;
    id: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        // и так далее, в зависимости от того, какие данные вам нужны
    };
    name: string;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    visibility: number;
    weather: {
        [index: number]: {
            description: string;
            icon: string;
            id: number;
            main: string;
        };
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
}

export interface WeatherInfo {
    dt: number;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    visibility: number;
    pop: number;
    rain?: {
        "3h": number;
    };
}

export interface WeekWeatherData {
    city: {
        name: string;
        country: string;
    };
    list: WeatherData[];
}

export interface Icon {
    width?: string;
    height?: string;
}

export interface IProps extends Icon {
    style?: React.CSSProperties;
}
