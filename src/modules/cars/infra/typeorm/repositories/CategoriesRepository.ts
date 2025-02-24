import type { Repository } from "typeorm";

import type {
	ICategoriesRepository,
	IcreateCategoryDTO,
} from "../../../repositories/ICategoriesRepository";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
	private repository: Repository<Category>;

	constructor() {
		this.repository = AppDataSource.getRepository(Category);
	}

	async create({ description, name }: IcreateCategoryDTO): Promise<void> {
		const category = this.repository.create({
			description,
			name,
		});

		await this.repository.save(category);
	}

	async list(): Promise<Category[]> {
		const categories = await this.repository.find();
		return categories;
	}

	async findByName(name: string): Promise<Category> {
		//Select * from categories where name === "name" limit 1
		const category = await this.repository.findOneBy({ name });
		return category;
	}
}

export { CategoriesRepository };
