import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		listAvailableCarsUseCase = new ListAvailableCarsUseCase(
			carsRepositoryInMemory,
		);
	});

	it("should be able to list all available cars", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Carro 01",
			description: "Car description",
			brand: "carBrand",
			categoryId: "categoryId",
			dailyRate: 150,
			fineAmount: 40,
			licensePlate: "ABC-1234",
		});

		const cars = await listAvailableCarsUseCase.execute({});

		expect(cars).toEqual([car]);
	});

	it("should be able to list all available cars by brand", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Carro 01",
			description: "Car description",
			brand: "carBrand",
			categoryId: "categoryId",
			dailyRate: 150,
			fineAmount: 40,
			licensePlate: "ABC-1234",
		});

		const car2 = await carsRepositoryInMemory.create({
			name: "Carro 02",
			description: "Car description",
			brand: "carBrande",
			categoryId: "categoryId2",
			dailyRate: 150,
			fineAmount: 40,
			licensePlate: "ABC-1234",
		});

		const cars = await listAvailableCarsUseCase.execute({
			brand: "carBrand",
		});

		expect(cars).toEqual([car]);
	});

	it("should be able to list all available cars by name", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Carro 01",
			description: "Car description",
			brand: "carBrand",
			categoryId: "categoryId",
			dailyRate: 150,
			fineAmount: 40,
			licensePlate: "ABC-1234",
		});

		const car2 = await carsRepositoryInMemory.create({
			name: "Carro 02",
			description: "Car description",
			brand: "carBrande",
			categoryId: "categoryId2",
			dailyRate: 150,
			fineAmount: 40,
			licensePlate: "ABC-1234",
		});

		const cars = await listAvailableCarsUseCase.execute({
			name: "Carro 02",
		});

		expect(cars).toEqual([car2]);
	});

	it("should be able to list all available cars by category", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Carro 01",
			description: "Car description",
			brand: "carBrand",
			categoryId: "categoryId",
			dailyRate: 150,
			fineAmount: 40,
			licensePlate: "ABC-1234",
		});

		const car2 = await carsRepositoryInMemory.create({
			name: "Carro 02",
			description: "Car description",
			brand: "carBrande",
			categoryId: "categoryId2",
			dailyRate: 150,
			fineAmount: 40,
			licensePlate: "ABC-1234",
		});

		const cars = await listAvailableCarsUseCase.execute({
			categoryId: "categoryId2",
		});

		expect(cars).toEqual([car2]);
	});
});
