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
	}: ICreateCarDTO): Promise<Car> {
		const car = this.repository.create({
			brand,
			categoryId,
			dailyRate,
			description,
			fineAmount,
			licensePlate,
			name,
		});

		await this.repository.save(car);

		return car;
	}
	async findByLicensePlate(licensePlate: string): Promise<Car> {
		const car = await this.repository.findOneBy({ licensePlate });
		return car;
	}
}

export { CarsRepository };
