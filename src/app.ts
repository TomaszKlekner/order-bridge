import express, { type Express } from "express";
import { healthRouter } from "./routes/health.js";

const app: Express = express();

app.use(express.json());
app.use("/health", healthRouter);

export { app };
