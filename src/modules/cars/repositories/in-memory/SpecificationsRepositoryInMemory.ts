import { Specification } from "../../infra/typeorm/entities/Specification";
import type {
	IcreateSpecificationDTO,
	ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {
	specifications: Specification[] = [];

	async findByName(name: string): Promise<Specification> {
		const specification = this.specifications.find(
			(specification) => specification.name === name,
		);
		return specification;
	}

	async list(): Promise<Specification[]> {
		return this.specifications;
	}

	async create({
		name,
		description,
	}: IcreateSpecificationDTO): Promise<Specification> {
		const specification = new Specification();

		Object.assign(specification, {
			name,
			description,
		});

		this.specifications.push(specification);

		return specification;
	}

	async findByIds(ids: string[]): Promise<Specification[]> {
		const allSpecifications = this.specifications.filter((specification) =>
			ids.includes(specification.id),
		);
		return allSpecifications;
	}
}

export { SpecificationRepositoryInMemory };
