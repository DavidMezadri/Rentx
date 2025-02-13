import type { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { Specification } from "../../entities/Specification";
import type {
	ISpecificationRepository,
	IcreateSpecificationDTO,
} from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
	private repository: Repository<Specification>;

	constructor() {
		this.repository = AppDataSource.getRepository(Specification);
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

	async create({ name, description }: IcreateSpecificationDTO): Promise<void> {
		const specification = this.repository.create({
			description,
			name,
		});

		await this.repository.save(specification);
	}
}

export { SpecificationRepository };
