import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { pino } from "pino";
import cookieParser from 'cookie-parser';

import { env } from "@common/utils/envConfig";
import errorHandler from "@common/middleware/errorHandler";
import { categoryRouter } from "@modules/categories/categoryRouter";
import { userRouter } from "@modules/users/userRouter";

const logger = pino({ name: "server start" });
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Routes
app.use("/v1/category", categoryRouter);
app.use("/v1/user", userRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
