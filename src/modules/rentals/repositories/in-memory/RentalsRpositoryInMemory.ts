import type { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import type { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
	rentals: Rental[] = [];

	async findOpenRentalByCar(carId: string): Promise<Rental> {
		return this.rentals.find(
			(rental) => rental.carId === carId && !rental.endDate,
		);
	}

	async findOpenRentalByUser(userId: string): Promise<Rental> {
		return this.rentals.find(
			(rental) => rental.userId === userId && !rental.endDate,
		);
	}

	async create({
		carId,
		expectedReturnDate,
		userId,
	}: ICreateRentalDTO): Promise<Rental> {
		const rental = new Rental();

		Object.assign(rental, {
			carId,
			expectedReturnDate,
			userId,
			startDate: new Date(),
		});

		this.rentals.push(rental);

		return rental;
	}
}

export { RentalsRepositoryInMemory };
