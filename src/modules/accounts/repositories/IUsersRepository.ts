import type { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import type { User } from "../entities/User";

interface IUsersRepository {
	create(data: ICreateUsersDTO): Promise<void>;
	findByEmail(email: string): Promise<User>;
	findById(id: string): Promise<User>;
}

export type { IUsersRepository };
