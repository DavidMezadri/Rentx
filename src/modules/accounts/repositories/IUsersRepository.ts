import type { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import type { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
	create(data: ICreateUsersDTO): Promise<void>;
	findByEmail(email: string): Promise<User>;
	findById(id: string): Promise<User>;
}

export type { IUsersRepository };
