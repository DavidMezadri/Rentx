import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create car Speficication", () => {
	beforeEach(() => {
		specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepositoryInMemory,
			specificationsRepositoryInMemory,
		);
	});

	it("should not be able to add a new specification to a now-existent car", () => {
		expect(async () => {
			const carId = "1234";
			const specificationsId = ["54321"];

			await createCarSpecificationUseCase.execute({ carId, specificationsId });
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should be able to add a new specification to the car", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car1",
			description: "name car",
			brand: "brand",
			categoryId: "category",
			dailyRate: 100,
			fineAmount: 60,
			licensePlate: "abc-1234",
		});

		const specification = await specificationsRepositoryInMemory.create({
			description: "Test Specification",
			name: "Test",
		});

		const specificationsId = [specification.id];

		const specificationCars = await createCarSpecificationUseCase.execute({
			carId: car.id,
			specificationsId,
		});

		expect(specificationCars).toHaveProperty("specifications");
		expect(specificationCars.specifications.length).toBe(1);
	});
});
