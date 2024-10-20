interface ReqBody {
    username: string,
    password: string
}

const user = {
    username: 'admin',
    password: '12345678'
}

function TypeCheck(obj: any): obj is ReqBody {
    return typeof obj === 'object' &&
        typeof obj.username === 'string' &&
        typeof obj.password === 'string'
}


export default async function POST(req: Request) {
    const body: ReqBody = await req.json();
    if (!TypeCheck(body)) {
        return new Response(JSON.stringify({ message: 'Invalid JSON format' }), {
            "headers": {
                "Content-Type": 'application/json'
            },
            status: 400
        })
    }
    if (user.username === body.username && user.password === body.password) {
        return new Response(JSON.stringify({ message: 'Succesfully logged in.' }), {
            "headers": {
                "Content-Type": 'application/json'
            },
            status: 201
        })
    } else {
        return new Response(JSON.stringify({ message: 'Username or password wrong.' }), {
            "headers": {
                "Content-Type": 'application/json'
            },
            status: 403
        })
    }
}

export const method = 'POST';