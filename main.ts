// import { RequestHandler } from "./RequestHandler.ts";
import { RequestHandler } from "./mts.ts";


async function handle(req: Request): Promise<Response> {

  return await RequestHandler(req);

}

const PORT: number = 3000;

Deno.serve({ handler: handle, port: PORT });
console.log(`Server deployed at ${PORT}`);
