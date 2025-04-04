const modules = {
  "/search_GET": () => import("../api/search/index.ts"),
  "/weather_GET": () => import("../api/weather/index.ts"),
  "/weather/city_GET": () => import("../api/weather/city/index.ts"),
  "/login_POST": () => import("../api/login/index.ts"),
};

export default modules;