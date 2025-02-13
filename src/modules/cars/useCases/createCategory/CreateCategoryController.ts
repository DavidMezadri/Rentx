import type { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { name, description } = request.body;

		const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

		await createCategoryUseCase.execute({ name, description });

		response.status(201).send();
		return;
	}
}

export { CreateCategoryController };
