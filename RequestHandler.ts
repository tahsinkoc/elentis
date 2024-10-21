interface ApiModule {
    pathname: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    function: (req:Request) => Promise<Response>;
}

async function loadApiModules(directory: string, basePath = ''): Promise<ApiModule[]> {
    const modules: ApiModule[] = [];
    for await (const entry of Deno.readDir(directory)) {
        if (entry.isDirectory) {
            const folderPath = `${directory}/${entry.name}`;
            const newPath = basePath ? `${basePath}/${entry.name}` : `/${entry.name}`;

            const indexFilePath = `${folderPath}/index.ts`;
            try {
                await Deno.stat(indexFilePath);

                const module = await import(indexFilePath);

                if (typeof module.default === 'function' && typeof module.method === 'string') {
                    modules.push({
                        pathname: newPath,
                        method: module.method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE',
                        function: module.default,
                    });
                } else {
                    console.warn(`${indexFilePath} bir fonksiyon ve method export etmiyor!`);
                }
            } catch {
                //
            }

            const subModules = await loadApiModules(folderPath, newPath);
            modules.push(...subModules);
        }
    }

    return modules;
}

export async function RequestHandler(req: Request): Promise<Response> {
    const apiModules = await loadApiModules('./api');
    const url = new URL(req.url);
    const pathname = url.pathname;

    const target = apiModules.find(route => route.pathname === pathname && route.method === req.method);

    if (target) {
        return target.function(req);
    } else {
        return new Response("Not Found", { status: 404 });
    }
}
