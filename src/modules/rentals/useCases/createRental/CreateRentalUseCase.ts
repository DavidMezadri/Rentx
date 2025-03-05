import { inject, injectable } from "tsyringe";
import type { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import type { Rental } from "../../infra/typeorm/entities/Rental";
import type { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
	userId: string;
	carId: string;
	expectedReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {
	constructor(
		@inject("RentalsRepository")
		private rentalsRepository: IRentalsRepository,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider,
	) {}

	async execute({
		carId,
		expectedReturnDate,
		userId,
	}: IRequest): Promise<Rental> {
		const minimumHour = 24;

		const carUnavailable =
			await this.rentalsRepository.findOpenRentalByCar(carId);

		if (carUnavailable) {
			throw new AppError("Car is unavailable!");
		}

		const rentalOpenToUser =
			await this.rentalsRepository.findOpenRentalByUser(userId);

		if (rentalOpenToUser) {
			throw new AppError("There's a rental in progress for user!");
		}

		const dateNow = this.dateProvider.dateNow();

		const compare = this.dateProvider.compareInHours(
			dateNow,
			expectedReturnDate,
		);

		if (compare < minimumHour) {
			throw new AppError("Invalid return time!");
		}

		const rental = await this.rentalsRepository.create({
			userId,
			carId,
			expectedReturnDate,
		});
		return rental;
	}
}

export { CreateRentalUseCase };
