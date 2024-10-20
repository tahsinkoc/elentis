interface Weather {
    weather: 'Cloudy' | 'Rainy' | 'Sunny' | 'Clear',
    temp: number,
    humidty: number
}

const wth = ['Cloudy', 'Rainy', 'Sunny', 'Clear'] as const;

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getWeather() {
    let weather: Weather = {
        weather: wth[getRandomInt(0, 3)],
        temp: getRandomInt(0, 35),
        humidty: getRandomInt(0, 100)
    }
    return weather
}