# ELENTIS REST API Tool for Deno runtime

## Overview

This is a Deno runtime REST API Tool that provides a simple way to create RESTful APIs with folder-based routing. The library allows you to easily organize your API endpoints and handle requests with ease.

## Features

- Folder-based routing
- Easy to use request handlers
- Support for nested routes
- Built-in method handling (GET, POST, etc.)
- Simple and clean code structure

## Installation

To use this Tool, you need to have Deno installed on your machine. You can download it from [Deno's official website](https://deno.land/).

## Usage

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/tahsinkoc/elentis.git
   cd elentis
   
2. Create your API structure in the api folder. Each folder can have an index.ts file that exports a request handler function.
3. Build Routes
    ```bash
   deno run -A build.ts
4. Start the server
    ```bash
   deno run --allow-net main.ts
5. Acces the API endpoints.
    ```bash
    /weather
    /weather/city

## Example

Here’s a simple example of how to set up an API endpoint:

```ts
// api/weather/index.ts
import { getWeather } from "../../components/CreateWeather.ts";

export default function GET() {
    const weather = getWeather();
    return new Response(JSON.stringify(weather), {
        'headers': {
            'Content-Type': 'application/json'
        },
        status: 200
    })
}

export const method = 'GET';
```

## Testing

To run the tests, use the following command:

```bash
deno test --allow-read --allow-net
```
## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

# 🛣️ Elentis Roadmap

Elentis is a Deno-based, minimal, file-system routed REST API tool. While it is currently simple and functional, it is open to contributions as an open-source project and is highly adaptable for further development.

## 🔧 Core Developments (v0.2.x)

- [ ] `config()` function: Centralized management of global settings such as headers, logger, and CORS.
- [ ] `use()` function: Middleware support that applies to all requests.
- [ ] `RequestHelper` class: Helper functions for `searchParams`, `formData`, `json()`, etc.
- [ ] `ResponseHelper` class: Standardized response structures (e.g., `ok()`, `error()`).
- [ ] Custom 404 and 500 handler mechanisms.
- [ ] CLI interface (e.g., `elentis dev` for development command).

## 📦 Advanced Features (v0.3.x and beyond)

- [ ] Schema validation integration (e.g., Zod, Valibot, etc.).
- [ ] Route-based middleware support.
- [ ] Project-specific configuration using the `elentis.config.ts` file.
- [ ] `ElentisAdapter` for compatibility with different HTTP servers (e.g., Aleph.js, Deno Fresh, etc.).

## ✅ Open for Contributions

> This section contains suitable entry points for developers looking to contribute.

- [ ] Design and implementation of the `RequestHelper` class.
- [ ] Creation of the `config()` singleton structure.
- [ ] Simple middleware example (e.g., request logger).
- [ ] Centralization of CORS settings.
- [ ] Helper functions or class for `searchParams`.
- [ ] Expanding example usage scenarios in the README.
- [ ] Setting up test infrastructure (`Deno.test`).

---

We welcome all contributions! 🙌  
Feel free to open issues, submit pull requests, or reach out to discuss ideas.


## License
This project is licensed under the MIT License - see the LICENSE file for details.
