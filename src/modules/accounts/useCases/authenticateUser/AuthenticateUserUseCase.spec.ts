import { AppError } from "../../../../errors/AppError";
import type { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let creteUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate User", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory,
		);
		creteUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it("should be able to authenticate an user", async () => {
		const user: ICreateUsersDTO = {
			driverLicense: "000123",
			email: "davidme@test.com",
			name: "David Test",
			password: "123456",
		};

		await creteUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty("token");
	});

	it("should not be able to authenticate an none existent user", () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: "false@test.com",
				password: "1234",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to authenticate with incorrect password", () => {
		expect(async () => {
			const user: ICreateUsersDTO = {
				driverLicense: "0001234",
				email: "test@test.com",
				name: "test123",
				password: "1234",
			};

			await creteUserUseCase.execute(user);

			await authenticateUserUseCase.execute({
				email: user.email,
				password: "incorrectPassword",
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
