import type { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";

import type { ICarsRepository } from "../ICarsRepostory";

class CarsRepositoryInMemory implements ICarsRepository {
	cars: Car[] = [];

	async create({
		name,
		description,
		brand,
		categoryId,
		dailyRate,
		fineAmount,
		licensePlate,
	}: ICreateCarDTO): Promise<Car> {
		const car = new Car();

		Object.assign(car, {
			name,
			description,
			brand,
			categoryId,
			dailyRate,
			fineAmount,
			licensePlate,
		});

		this.cars.push(car);
		return car;
	}

	async findByLicensePlate(licensePlate: string): Promise<Car> {
		const car = await this.cars.find(
			(car) => car.licensePlate === licensePlate,
		);
		return car;
	}
}

export { CarsRepositoryInMemory };
