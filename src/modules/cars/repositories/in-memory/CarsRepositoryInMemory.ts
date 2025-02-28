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
		specifications,
		id,
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
			specifications,
			id,
		});

		this.cars.push(car);
		return car;
	}

	async findByLicensePlate(licensePlate: string): Promise<Car> {
		const car = this.cars.find((car) => car.licensePlate === licensePlate);
		return car;
	}

	async findAvailable(
		brand?: string,
		categoryId?: string,
		name?: string,
	): Promise<Car[]> {
		const all = this.cars.filter(
			(car) =>
				car.available === true &&
				(!brand || car.brand === brand) &&
				(!categoryId || car.categoryId === categoryId) &&
				(!name || car.name === name),
		);

		return all;
	}

	async findById(id: string): Promise<Car> {
		return this.cars.find((car) => car.id === id);
	}
}

export { CarsRepositoryInMemory };
