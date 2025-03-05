import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRpositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create rental", () => {
	const dayAdd24Hours = dayjs().add(1, "day").toDate();
	beforeEach(() => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
		dayjsDateProvider = new DayjsDateProvider();
		createRentalUseCase = new CreateRentalUseCase(
			rentalsRepositoryInMemory,
			dayjsDateProvider,
		);
	});

	it("Should be able to create a new rental", async () => {
		const rental = await createRentalUseCase.execute({
			userId: "12345",
			carId: "121212",
			expectedReturnDate: dayAdd24Hours,
		});

		expect(rental).toHaveProperty("id");
		expect(rental).toHaveProperty("startDate");
	});

	it("Should not be able to create a new rental if there is another open to the same user", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				userId: "12345",
				carId: "121212",
				expectedReturnDate: dayAdd24Hours,
			});

			await createRentalUseCase.execute({
				userId: "12345",
				carId: "121212",
				expectedReturnDate: dayAdd24Hours,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("Should not be able to create a new rental if there is another open to the same car", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				userId: "123",
				carId: "test",
				expectedReturnDate: dayAdd24Hours,
			});

			await createRentalUseCase.execute({
				userId: "321",
				carId: "test",
				expectedReturnDate: dayAdd24Hours,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("Should not be able to create a new rental with invalid return time", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				userId: "123",
				carId: "test",
				expectedReturnDate: dayjs().toDate(),
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
