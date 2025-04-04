// build-routes.ts

interface ApiModule {
    pathname: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    modulePath: string; // Gerçek dosya yolu
}

async function scanApiModules(directory: string, basePath = ''): Promise<ApiModule[]> {
    const modules: ApiModule[] = [];
    for await (const entry of Deno.readDir(directory)) {
        if (entry.isDirectory) {
            const folderPath = `${directory}/${entry.name}`;
            const newPath = basePath ? `${basePath}/${entry.name}` : `/${entry.name}`;

            const indexFilePath = `${folderPath}/index.ts`;
            try {
                await Deno.stat(indexFilePath);

                // Dosyanın içeriğini okuyarak method bilgisini çıkar
                const content = await Deno.readTextFile(indexFilePath);
                const methodMatch = content.match(/export\s+const\s+method\s*=\s*['"]([^'"]+)['"]/);

                if (methodMatch) {
                    const method = methodMatch[1].toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE';

                    modules.push({
                        pathname: newPath,
                        method: method,
                        modulePath: indexFilePath.replace('./api/', ''), // Göreceli yolu kaydet
                    });
                }
            } catch {
                // Dosya bulunamadı veya okunamadı
            }

            const subModules = await scanApiModules(folderPath, newPath);
            modules.push(...subModules);
        }
    }

    return modules;
}

async function main() {
    try {
        const apiModules = await scanApiModules('./api');

        // Route bilgilerini JSON dosyasına yaz
        await Deno.writeTextFile('./build/routes.json', JSON.stringify(apiModules, null, 2));

        // Tüm modülleri tek bir dosyada birleştiren bir import map oluştur
        let importCode = 'const modules = {\n';

        for (let i = 0; i < apiModules.length; i++) {
            const mod = apiModules[i];
            importCode += `  "${mod.pathname}_${mod.method}": () => import("../api/${mod.modulePath}"),\n`;
        }

        importCode += '};\n\nexport default modules;';

        await Deno.writeTextFile('./build/moduleImports.ts', importCode);

        console.log(`${apiModules.length} route builded and saved to routes.json`);
    } catch (error) {
        console.error("Error during build:", error);
    }
}

main();