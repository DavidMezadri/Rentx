import type { ICarsRepository } from "../../repositories/ICarsRepostory";
import { AppError } from "../../../../shared/errors/AppError";
import type { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import type { Car } from "../../infra/typeorm/entities/Car";
import { inject, injectable } from "tsyringe";

interface IRequest {
	carId: string;
	specificationsId: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
	constructor(
		@inject("CarsRepository")
		private carsRepository: ICarsRepository,

		@inject("SpecificationRepository")
		private specificationsRepository: ISpecificationRepository,
	) {}

	async execute({ carId, specificationsId }: IRequest): Promise<Car> {
		const carExists = await this.carsRepository.findById(carId);

		if (!carExists) {
			throw new AppError("Car does not exists!");
		}

		const specifications =
			await this.specificationsRepository.findByIds(specificationsId);

		carExists.specifications = specifications;

		await this.carsRepository.create(carExists);

		return carExists;
	}
}

export { CreateCarSpecificationUseCase };
