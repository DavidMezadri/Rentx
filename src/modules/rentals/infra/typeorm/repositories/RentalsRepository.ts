import type { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source";
import type { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import type { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
	private repository: Repository<Rental>;

	constructor() {
		this.repository = AppDataSource.getRepository(Rental);
	}

	async findOpenRentalByCar(carId: string): Promise<Rental> {
		const openByCar = await this.repository.findOneBy({ carId });
		return openByCar;
	}

	async findOpenRentalByUser(userId: string): Promise<Rental> {
		const openByUser = await this.repository.findOneBy({ userId });
		return openByUser;
	}

	async create({
		carId,
		expectedReturnDate,
		userId,
	}: ICreateRentalDTO): Promise<Rental> {
		const rental = this.repository.create({
			carId,
			expectedReturnDate,
			userId,
		});

		await this.repository.save(rental);

		return rental;
	}
}

export { RentalsRepository };
