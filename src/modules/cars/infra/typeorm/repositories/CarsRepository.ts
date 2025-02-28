import type { Repository } from "typeorm";

import type { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import type { ICarsRepository } from "../../../repositories/ICarsRepostory";
import { Car } from "../entities/Car";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source";

class CarsRepository implements ICarsRepository {
	private repository: Repository<Car>;

	constructor() {
		this.repository = AppDataSource.getRepository(Car);
	}

	async create({
		brand,
		categoryId,
		dailyRate,
		description,
		fineAmount,
		licensePlate,
		name,
		specifications,
		id,
	}: ICreateCarDTO): Promise<Car> {
		const car = this.repository.create({
			brand,
			categoryId,
			dailyRate,
			description,
			fineAmount,
			licensePlate,
			name,
			specifications,
			id,
		});

		await this.repository.save(car);

		return car;
	}

	async findByLicensePlate(licensePlate: string): Promise<Car> {
		const car = await this.repository.findOneBy({ licensePlate });
		return car;
	}

	async findAvailable(
		brand?: string,
		categoryId?: string,
		name?: string,
	): Promise<Car[]> {
		const carsQuery = await this.repository
			.createQueryBuilder("c")
			.where("available = :available", { available: true });

		if (brand) {
			carsQuery.andWhere("brand = :brand", { brand });
		}

		if (name) {
			carsQuery.andWhere("name = :name", { name });
		}

		if (categoryId) {
			carsQuery.andWhere("categoryId = :categoryId", { categoryId });
		}

		const cars = await carsQuery.getMany();

		return cars;
	}

	async findById(id: string): Promise<Car> {
		const car = await this.repository.findOneBy({ id });
		return car;
	}
}

export { CarsRepository };
