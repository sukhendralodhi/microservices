
import http, { IncomingMessage, ServerResponse } from "node:http";

type User = {
    id: number;
    name: string;
    email: string;
};

type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
};

const users: User[] = [
    {
        id: 1, name: "Sanju", email: "sanju@gmail.com"
    },
    {
        id: 2, name: "Mohan", email: "mohan@gmail.com"
    }
];

function sendJson<T>(
    res: ServerResponse,
    statusCode: number,
    body: ApiResponse<T>
): void {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(body));
}

const PORT = 5002;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const reqUrl = new URL(req.url ?? "/", `http:${req.headers.host}`);
    const pathName = reqUrl.pathname;

    if (method === "GET" && pathName === "/") {
        sendJson(
            res,
            200,
            {
                success: true,
                message: "server is running",
                data: {
                    routes: ["GET/users"]
                }
            }
        );
        return;
    }

    if (method === "GET" && pathName === "/users") {
        sendJson(
            res,
            200,
            {
                success: true,
                message: "user fetched successfully",
                data: users
            }
        );
        return;
    }

    sendJson<null>(
        res, 404,
        {
            success: false,
            message: "Route not found",
            error: "this method not found"
        }
    )

});


server.listen(PORT, () => {
    console.log("Server is runnig on", PORT);
});