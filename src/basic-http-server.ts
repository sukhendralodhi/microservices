import http, { IncomingMessage, ServerResponse } from "node:http";
const PORT = 3000;


// http.createServer this is create low level http server
// callback is going to run on every incoming req

// method = GET, POST, PUT , DELETE
// HEADERS = actual metadata send by the client
// req body = data post, put
// res = response object that send back to client
// status code, response headers, response body

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method;
    const url = req.url;
    const userAgent = req.headers["user-agent"];

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    res.end(`Basic http node server ${method}, ${url}, ${userAgent}`);
});


server.listen(PORT, () => {
    console.log(`Sever is running on PORT ${PORT}`);
});