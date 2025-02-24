import express from "express";
import type { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "../typeorm/index";

import "../../container";

import { AppError } from "../../errors/AppError";
import { router } from "./routes";
import swaggerFile from "../../../swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return void response.status(err.statusCod).json({
				message: err.message,
			});
		}

		return void response.status(500).json({
			status: "error",
			message: `Internal server error - ${err.message}`,
		});
	},
);

app.listen(3333, () => console.log("Server Is Running!"));
