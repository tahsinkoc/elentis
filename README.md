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

3. Start the server
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
export default async function GET(req: Request) {
    const response = {
        weather: 'Sunny',
        temperature: 25,
    };
    return new Response(JSON.stringify(response), {
        headers: {
            "Content-Type": 'application/json',
        },
    });
}
```

## Testing

To run the tests, use the following command:

```bash
deno test --allow-read --allow-net
```
## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
