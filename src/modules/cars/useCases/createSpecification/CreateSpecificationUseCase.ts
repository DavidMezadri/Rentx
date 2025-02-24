import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import type { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
	name: string;
	description: string;
}
@injectable()
class CreateSpecificationUseCase {
	constructor(
		@inject("SpecificationRepository")
		private specificationsRepository: ISpecificationRepository,
	) {}

	async execute({ name, description }: IRequest): Promise<void> {
		const specificationAlreadyExists =
			await this.specificationsRepository.findByName(name);

		if (specificationAlreadyExists) {
			throw new AppError("Spacification Already exists!");
		}

		await this.specificationsRepository.create({
			name,
			description,
		});
	}
}

export { CreateSpecificationUseCase };
