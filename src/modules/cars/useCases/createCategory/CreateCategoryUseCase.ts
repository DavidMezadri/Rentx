import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import type { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface Irequest {
	name: string;
	description: string;
}

/* COLOCAR O PRIVATE DENTRO DO CONSTRUTOR É FAZER ISSO:
class CreateCategoryService {
    constructor(private categoriesRepository: CategoriesRepository) {
        // Atribuição implícita feita pelo TypeScript
    }

//    Não é cópia, é referência
 */
@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository,
	) {}

	async execute({ name, description }: Irequest): Promise<void> {
		const categoryAlreadyExists =
			await this.categoriesRepository.findByName(name);

		if (categoryAlreadyExists) {
			throw new AppError("Category Already exists!");
		}

		this.categoriesRepository.create({ name, description });
	}
}

export { CreateCategoryUseCase };
