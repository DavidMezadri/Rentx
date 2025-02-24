import type { Specification } from "../infra/typeorm/entities/Specification";

//DTO => Data Transfer objetic
interface IcreateSpecificationDTO {
	name: string;
	description: string;
}

interface ISpecificationRepository {
	findByName(name: string): Promise<Specification>;
	list(): Promise<Specification[]>;
	create({ name, description }: IcreateSpecificationDTO): Promise<void>;
}

export type { ISpecificationRepository, IcreateSpecificationDTO };
