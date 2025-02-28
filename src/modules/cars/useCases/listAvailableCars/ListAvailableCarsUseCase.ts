import { inject, injectable } from "tsyringe";
import type { Car } from "../../infra/typeorm/entities/Car";
import type { ICarsRepository } from "../../repositories/ICarsRepostory";

interface IRequest {
	categoryId?: string;
	brand?: string;
	name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
	constructor(
		@inject("CarsRepository")
		private carsRepository: ICarsRepository,
	) {}

	async execute({ brand, categoryId, name }: IRequest): Promise<Car[]> {
		const cars = await this.carsRepository.findAvailable(
			brand,
			categoryId,
			name,
		);
		return cars;
	}
}

export { ListAvailableCarsUseCase };
