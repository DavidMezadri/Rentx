import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import type { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private userRepository: IUsersRepository,
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		//verificar se usuário existe
		const userAlreadyExists = await this.userRepository.findByEmail(email);
		if (!userAlreadyExists) {
			throw new AppError("Email or password incorrect!");
		}

		//se a senha esta correta
		const passwordMatch = await compare(password, userAlreadyExists.password);

		if (!passwordMatch) {
			throw new AppError("Email or password incorrect!");
		}

		//gerar o jsonwebtoken
		const token = sign({}, "b535b2c1230361e72c12ccdf532db00b", {
			subject: userAlreadyExists.id,
			expiresIn: "1d",
		});

		const user: IResponse = {
			user: {
				name: userAlreadyExists.name,
				email: userAlreadyExists.email,
			},
			token,
		};
		return user;
	}
}

export { AuthenticateUserUseCase };
