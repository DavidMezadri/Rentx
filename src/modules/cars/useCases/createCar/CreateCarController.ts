import { container } from "tsyringe";
import type { Request, Response } from "express";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			name,
			description,
			brand,
			categoryId,
			dailyRate,
			fineAmount,
			licensePlate,
		} = request.body;

		const createCarUseCase = container.resolve(CreateCarUseCase);

		const car = await createCarUseCase.execute({
			name,
			description,
			brand,
			categoryId,
			dailyRate,
			fineAmount,
			licensePlate,
		});
		return response.status(201).json(car);
	}
}

export { CreateCarController };
