import type { Repository } from "typeorm";

import type { ICarsImagesRepository } from "../../../repositories/ICarsImagesRepository";
import { CarImage } from "../entities/CarImage";

import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source";

class CarsImagesRepository implements ICarsImagesRepository {
	private repository: Repository<CarImage>;

	constructor() {
		this.repository = AppDataSource.getRepository(CarImage);
	}

	async create(carId: string, imageName: string): Promise<CarImage> {
		const carImage = this.repository.create({
			carId,
			imageName,
		});

		await this.repository.save(carImage);

		return carImage;
	}
}

export { CarsImagesRepository };
