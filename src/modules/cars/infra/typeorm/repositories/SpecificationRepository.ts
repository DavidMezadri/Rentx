import { In, type Repository } from "typeorm";

import type {
	IcreateSpecificationDTO,
	ISpecificationRepository,
} from "../../../repositories/ISpecificationRepository";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
	private repository: Repository<Specification>;

	constructor() {
		this.repository = AppDataSource.getRepository(Specification);
	}
	async findByIds(ids: string[]): Promise<Specification[]> {
		const specifications = await this.repository.findBy({ id: In(ids) });
		return specifications;
	}
	async findByName(name: string): Promise<Specification> {
		const specification = await this.repository.findOneBy({
			name,
		});
		return specification;
	}

	async list(): Promise<Specification[]> {
		const specifications = await this.repository.find();
		return specifications;
	}

	async create({
		name,
		description,
	}: IcreateSpecificationDTO): Promise<Specification> {
		const specification = this.repository.create({
			description,
			name,
		});

		await this.repository.save(specification);

		return specification;
	}
}

export { SpecificationRepository };
