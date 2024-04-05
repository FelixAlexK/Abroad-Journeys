import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import http from "http";
import router from "./router";
const app = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router);
const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running...", server.address());
});
