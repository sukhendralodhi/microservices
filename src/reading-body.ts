import http, { IncomingMessage, ServerResponse } from "node:http";

type CreateUserBody = {
    name?: string;
    email?: string;
}

const PORT = 5002;
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const reqUrl = new URL(req.url ?? "/", `http:${req.headers.host}`);
    const pathName = reqUrl.pathname;
    res.setHeader("Content-Type", "text/plain");

    if (method === "POST" && pathName === "/users") {
        const chunks: Buffer[] = [];

        req.on("data", (chunk: Buffer) => {
            chunks.push(chunk);
        });

        req.on("end", () => {
            try {
                const rawBody = Buffer.concat(chunks).toString("utf-8").trim();

                if (!rawBody) {
                    res.statusCode = 400;
                    res.end("req body is required");
                    return;
                }

                const body = JSON.parse(rawBody) as CreateUserBody;

                if (!body.name || !body.email) {
                    res.statusCode = 400;
                    res.end("Both name and email is required");
                    return;
                }

                res.statusCode = 200;
                res.end(`User created ${body.email}, ${body.name}`);
            } catch (error) {
                res.statusCode = 400;
                res.end("Server error");
            }
        });

        req.on("error", () => {
            res.statusCode = 500;
            res.end("Server failed to read req body");

        })
        return;
    }

    res.statusCode = 404;
    res.end("Route Not Found");
});

server.listen(PORT, () => {
    console.log("Server is runnig on", PORT);
});