import express, { urlencoded } from "express";
import cors from "cors";
const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        Credential: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import healthcheckrouter from "./routes/healthcheck.routes.js";

app.use("/api/v1/healthcheck", healthcheckrouter);

export { app };
