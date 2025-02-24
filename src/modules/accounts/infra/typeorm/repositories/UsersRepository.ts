import type { Repository } from "typeorm";

import type { IUsersRepository } from "../../../repositories/IUsersRepository";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { AppError } from "../../../../../shared/errors/AppError";
import type { ICreateUsersDTO } from "../../../dtos/ICreateUsersDTO";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
	private repository: Repository<User>;

	constructor() {
		this.repository = AppDataSource.getRepository(User);
	}

	async create({
		name,
		email,
		password,
		driverLicense,
		avatar,
		id,
	}: ICreateUsersDTO): Promise<void> {
		const user = this.repository.create({
			name,
			email,
			password,
			driverLicense,
			avatar,
			id,
		});

		await this.repository.save(user);
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.repository.findOneBy({ email });
		if (!user) {
			throw new AppError("");
		}
		return user;
	}

	async findById(id: string): Promise<User> {
		const user = await this.repository.findOneBy({ id });
		if (!user) {
			throw new AppError("");
		}
		return user;
	}
}

export { UsersRepository };
