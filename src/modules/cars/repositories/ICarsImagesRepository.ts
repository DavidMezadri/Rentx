import type { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
	create(carId: string, imageName: string): Promise<CarImage>;
}

export type { ICarsImagesRepository };
