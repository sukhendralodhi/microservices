import http, { IncomingMessage, ServerResponse } from "node:http";
const PORT = 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const reqUrl = new URL(req.url ?? "/", `http:${req.headers.host}`);
    const pathName = reqUrl.pathname;

    res.setHeader("Content-Type", "text/plain");

    if (method === "GET" && pathName === "/health") {
        res.statusCode = 200;
        res.end("Sever is healthy");
        return;
    }

    if (method === "GET" && pathName === "/users") {
        res.statusCode = 200;
        res.end("List of users");
        return;
    }

    if (method === "POST" && pathName === "/users") {
        res.statusCode = 201;
        res.end("User Created");
        return;
    }

    res.statusCode = 404;
    res.end("Route Not Found");
});

server.listen(PORT, () => {
    console.log("Server is running on", PORT);
});