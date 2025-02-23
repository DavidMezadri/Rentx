import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
	sub: string;
}

export async function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError("Token missing!", 401);
	}
	//Bearer sbhsafbsaibasciunascunsdcasuhn7y237hd3

	const [, token] = authHeader.split(" ");

	try {
		const { sub: userId } = verify(
			token,
			"b535b2c1230361e72c12ccdf532db00b",
		) as IPayload;

		const usersRepository = new UsersRepository();

		const user = usersRepository.findById(userId);

		if (!user) {
			throw new AppError("User does not exists!", 401);
		}

		request.user = {
			id: userId,
		};

		next();
	} catch {
		throw new AppError("Invalid token", 401);
	}
}
