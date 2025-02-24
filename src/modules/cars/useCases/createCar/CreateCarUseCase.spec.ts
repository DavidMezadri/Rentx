import "reflect-metadata";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
	});

	it("should be able to create a new car", async () => {
		const car = await createCarUseCase.execute({
			name: "name car",
			description: "name car",
			brand: "brand",
			categoryId: "category",
			dailyRate: 100,
			fineAmount: 60,
			licensePlate: "abc-1234",
		});

		expect(car).toHaveProperty("id");
	});

	it("should not be able to create a car with exists license plate", async () => {
		expect(async () => {
			await createCarUseCase.execute({
				name: "Car1",
				description: "name car",
				brand: "brand",
				categoryId: "category",
				dailyRate: 100,
				fineAmount: 60,
				licensePlate: "abc-1234",
			});

			await createCarUseCase.execute({
				name: "Car2",
				description: "name car",
				brand: "brand",
				categoryId: "category",
				dailyRate: 100,
				fineAmount: 60,
				licensePlate: "abc-1234",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a car with available true by default", async () => {
		const car = await createCarUseCase.execute({
			name: "Car Available",
			description: "name car",
			brand: "brand",
			categoryId: "category",
			dailyRate: 100,
			fineAmount: 60,
			licensePlate: "abc-1234",
		});

		console.log(car);

		expect(car.available).toBe(true);
	});
});
