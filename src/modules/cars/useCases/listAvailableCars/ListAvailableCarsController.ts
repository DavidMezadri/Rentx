import type { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { categoryId, brand, name } = request.query;

		const listAvailableCarsUseCase = container.resolve(
			ListAvailableCarsUseCase,
		);

		const cars = await listAvailableCarsUseCase.execute({
			brand: brand as string,
			categoryId: categoryId as string,
			name: name as string,
		});

		return response.json(cars);
	}
}

export { ListAvailableController };
