import type { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
	async handle(request: Request, response: Response): Promise<Response> {
		const listCategoryUseCase = container.resolve(ListCategoriesUseCase);

		const all = await listCategoryUseCase.execute();
		response.json(all);
		return;
	}
}

export { ListCategoriesController };
