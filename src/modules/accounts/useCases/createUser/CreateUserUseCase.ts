import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import type { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import type { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,
	) {}

	async execute({
		name,
		email,
		password,
		driverLicense,
	}: ICreateUsersDTO): Promise<void> {
		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new AppError("User already exists");
		}

		const passwordHash = await hash(password, 8);

		await this.usersRepository.create({
			name,
			email,
			password: passwordHash,
			driverLicense,
		});
	}
}
export { CreateUserUseCase };
