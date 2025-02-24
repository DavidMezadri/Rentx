import { inject, injectable } from "tsyringe";

import type { ICarsRepository } from "../../repositories/ICarsRepostory";
import { AppError } from "../../../../shared/errors/AppError";
import type { Car } from "../../infra/typeorm/entities/Car";

interface IRequest {
	name: string;
	description: string;
	dailyRate: number;
	licensePlate: string;
	fineAmount: number;
	brand: string;
	categoryId: string;
}

@injectable()
class CreateCarUseCase {
	constructor(
		@inject("CarsRepository")
		private carRepository: ICarsRepository,
	) {}
	async execute({
		name,
		description,
		brand,
		categoryId,
		dailyRate,
		fineAmount,
		licensePlate,
	}: IRequest): Promise<Car> {
		const carAlreadyExists =
			await this.carRepository.findByLicensePlate(licensePlate);

		if (carAlreadyExists) {
			throw new AppError("Car already exists!");
		}

		const car = await this.carRepository.create({
			name,
			description,
			brand,
			categoryId,
			dailyRate,
			fineAmount,
			licensePlate,
		});
		return car;
	}
}

export { CreateCarUseCase };
