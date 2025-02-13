import type { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { name, email, password, driverLicense } = request.body;
		const creteUserUseCase = container.resolve(CreateUserUseCase);

		await creteUserUseCase.execute({
			name,
			email,
			password,
			driverLicense,
		});

		response.status(201).send();
		return;
	}
}

export { CreateUserController };
