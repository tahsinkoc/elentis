import { assertEquals } from "@std/assert";
import { RequestHandler } from "./RequestHandler.ts";
import { Weather } from "./components/CreateWeather.ts";


Deno.test("GET /weathers endpoint should return expected response", async () => {
    const req = new Request("http://localhost:3000/weather", {
        method: "GET",
    });
    const response = await RequestHandler(req);

    assertEquals(response.status, 200);

    const bodyText = await response.text();
    const body: Weather = JSON.parse(bodyText);

    assertEquals(typeof body, "object");
    assertEquals(body !== null, true);
    assertEquals(typeof body.weather, "string");
    assertEquals(typeof body.temp, "number");
    assertEquals(typeof body.humidty, "number");

});

Deno.test("GET /weathers/city endpoint should return expected response", async () => {
    const req = new Request("http://localhost:3000/weather/city", {
        method: "GET",
    });
    const response = await RequestHandler(req);

    assertEquals(response.status, 200);

    const bodyText = await response.text();
    const body = JSON.parse(bodyText);

    assertEquals(body.message, "City name");
});


