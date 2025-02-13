import type { Category } from "../entities/Category";

//DTO => Data Transfer objetic
interface IcreateCategoryDTO {
	name: string;
	description: string;
}

interface ICategoriesRepository {
	findByName(name: string): Promise<Category>;
	list(): Promise<Category[]>;
	create({ name, description }: IcreateCategoryDTO): Promise<void>;
}

export type { ICategoriesRepository, IcreateCategoryDTO };
