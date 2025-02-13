import type { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
	async handle(request: Request, response: Response): Promise<void> {
		const { id } = request.user;
		const avatarFile = request.file.filename;

		//Receber arquivo

		const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

		await updateUserAvatarUseCase.execute({ userId: id, avatarFile });

		return void response.status(204).send();
	}
}

export { UpdateUserAvatarController };
