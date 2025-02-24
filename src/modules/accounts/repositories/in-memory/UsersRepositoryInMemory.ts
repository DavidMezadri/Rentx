import type { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { User } from "../../infra/typeorm/entities/User";
import type { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
	users: User[] = [];

	async create({
		driverLicense,
		name,
		email,
		password,
	}: ICreateUsersDTO): Promise<void> {
		const user = new User();

		Object.assign(user, {
			driverLicense,
			email,
			name,
			password,
		});

		this.users.push(user);
	}
	async findByEmail(email: string): Promise<User> {
		const user = this.users.find((user) => user.email === email);
		return user;
	}
	async findById(id: string): Promise<User> {
		const user = this.users.find((user) => user.id === id);
		return user;
	}
}

export { UsersRepositoryInMemory };
