import routesData from "./build/routes.json" with { type: "json" };
import moduleImports from "./build/moduleImports.ts";

interface ApiRoute {
  pathname: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  modulePath: string;
}

interface CorsOptions {
  allowOrigin: string | string[];
  allowMethods: string[];
  allowHeaders: string[];
  exposeHeaders?: string[];
  allowCredentials?: boolean;
  maxAge?: number;
}

const defaultCorsOptions: CorsOptions = {
  allowOrigin: ["*"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"],
  allowHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
    "X-Requested-With",
  ],
  exposeHeaders: [],
  allowCredentials: true,
  maxAge: 86400, // 24 hours
};

function applyCors(
  response: Response,
  options: CorsOptions = defaultCorsOptions,
): Response {
  const headers = new Headers(response.headers);

  if (Array.isArray(options.allowOrigin)) {
    headers.set("Access-Control-Allow-Origin", options.allowOrigin[0]);
  } else {
    headers.set("Access-Control-Allow-Origin", options.allowOrigin);
  }

  headers.set("Access-Control-Allow-Methods", options.allowMethods.join(", "));
  headers.set("Access-Control-Allow-Headers", options.allowHeaders.join(", "));

  if (options.exposeHeaders && options.exposeHeaders.length > 0) {
    headers.set(
      "Access-Control-Expose-Headers",
      options.exposeHeaders.join(", "),
    );
  }

  if (options.allowCredentials) {
    headers.set("Access-Control-Allow-Credentials", "true");
  }

  if (options.maxAge) {
    headers.set("Access-Control-Max-Age", options.maxAge.toString());
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function RequestHandler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;

  if (req.method === "OPTIONS") {
    return applyCors(new Response(null, { status: 204 }));
  }

  const route = (routesData as ApiRoute[]).find(
    (route) => route.pathname === pathname && route.method === req.method,
  );

  if (route) {
    try {
      const moduleKey = `${route.pathname}_${route.method}`;
      const moduleLoader =
        moduleImports[moduleKey as keyof typeof moduleImports];

      if (moduleLoader) {
        const module = await moduleLoader();
        const response = await module.default(req);

        return applyCors(response);
      }
    } catch (error) {
      console.error(`Error loading module for ${pathname}:`, error);
      return applyCors(new Response("Internal Server Error", { status: 500 }));
    }
  }

  return applyCors(new Response("Not Found", { status: 404 }));
}
