import type { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import type { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
	findOpenRentalByCar(carId: string): Promise<Rental>;
	findOpenRentalByUser(userId: string): Promise<Rental>;
	create({
		carId,
		expectedReturnDate,
		userId,
	}: ICreateRentalDTO): Promise<Rental>;
}

export type { IRentalsRepository };
