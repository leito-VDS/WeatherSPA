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
    id: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        // и так далее, в зависимости от того, какие данные вам нужны
    };
    name: string;
    rain: {
        "1h": number;
    };
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
        // в зависимости от структуры данных в этом объекте
    }[];
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
}

interface WeatherInfo {
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
    list: WeatherInfo[];
}
