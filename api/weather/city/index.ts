export default function GET(req: Request): Response {
    return new Response(JSON.stringify({ message: 'City name' }), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 200
    })
}

export const method = 'GET';