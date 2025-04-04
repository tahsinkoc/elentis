// server.ts - Production version
import routesData from "./build/routes.json" with { type: "json" };
import moduleImports from "./build/moduleImports.ts";

interface ApiRoute {
  pathname: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  modulePath: string;
}

export async function RequestHandler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;
  
  // routes.json içinden uygun route'u bul
  const route = (routesData as ApiRoute[]).find(
    route => route.pathname === pathname && route.method === req.method
  );

  if (route) {
    try {
      // Lazy-load the module when needed
      const moduleKey = `${route.pathname}_${route.method}`;
      const moduleLoader = moduleImports[moduleKey as keyof typeof moduleImports];
      
      if (moduleLoader) {
        const module = await moduleLoader();
        return module.default(req);
      }
    } catch (error) {
      console.error(`Error loading module for ${pathname}:`, error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
  
  return new Response("Not Found", { status: 404 });
}