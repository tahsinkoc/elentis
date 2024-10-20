import { getWeather } from "../../components/CreateWeather.ts";

export default function GET() {
    const weather = getWeather();
    return new Response(JSON.stringify(weather), {
        'headers': {
            'Content-Type': 'application/json'
        }
    })
}

export const method = 'GET';