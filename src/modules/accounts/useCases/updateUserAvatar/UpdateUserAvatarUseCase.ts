import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../../repositories/IUsersRepository";
import { deleteFile } from "../../../../utils/file";

interface IRequest {
	userId: string;
	avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
	constructor(
		@inject("UsersRepository")
		private userRepository: IUsersRepository,
	) {}

	async execute({ userId, avatarFile }: IRequest): Promise<void> {
		const user = await this.userRepository.findById(userId);

		if (user.avatar) {
			await deleteFile(`./tmp/avatar/${user.avatar}`);
		}

		user.avatar = avatarFile;

		await this.userRepository.create(user);
	}
}

export { UpdateUserAvatarUseCase };
