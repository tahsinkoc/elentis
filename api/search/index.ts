export default function GET(req: Request): Response {
    const url = new URL(req.url);
    const searchParam = url.searchParams.get("search");
    if (!searchParam) {
        return new Response(JSON.stringify({ message: 'no search param' }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 400
        })
    }
    return new Response(JSON.stringify({ message: searchParam }), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 200
    })
}

export const method = 'GET';