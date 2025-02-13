import type { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const listSpecificationsUseCasee = container.resolve(
			ListSpecificationsUseCase,
		);

		const all = await listSpecificationsUseCasee.execute();
		response.json(all);
		return;
	}
}

export { ListSpecificationsController };
