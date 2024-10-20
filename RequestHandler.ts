interface Route {
    pathname: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    function: Function;
}

interface ApiModule {
    pathname: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    function: Function;
}

async function loadApiModules(directory: string): Promise<ApiModule[]> {
    const modules: ApiModule[] = [];
    for await (const entry of Deno.readDir(directory)) {
        if (entry.isDirectory) {
            const folderPath = `${directory}/${entry.name}`;
            const indexFilePath = `${folderPath}/index.ts`;

            try {
                await Deno.stat(indexFilePath);

                const module = await import(indexFilePath);

                if (typeof module.default === 'function' && module.method) {
                    modules.push({
                        pathname: `/${entry.name}`,
                        method: module.method,
                        function: module.default,
                    });
                } else {
                    console.warn(`${indexFilePath} uygun bir fonksiyon ve method export etmiyor!`);
                }
            } catch (error) {
                console.warn(`Error loading module from ${indexFilePath}:`, error);
            }
        }
    }

    return modules;
}

export async function RequestHandler(req: Request): Promise<Response> {
    const apiModules = await loadApiModules('./api');
    const url = new URL(req.url);
    const target = apiModules.find(route => route.pathname === url.pathname && route.method === req.method);

    if (target) {
        return target.function(req);
    } else {
        return new Response("Not Found", { status: 404 });
    }
}
