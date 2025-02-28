import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	dailyRate: number;

	@Column()
	available: boolean;

	@Column()
	licensePlate: string;

	@Column()
	fineAmount: number;

	@Column()
	brand: string;

	@ManyToOne(() => Category)
	@JoinColumn({ name: "categoryId" })
	category: Category;

	@Column()
	categoryId: string;

	@ManyToMany(() => Specification)
	@JoinTable({
		name: "specificationsCars",
		joinColumns: [{ name: "carId" }],
		inverseJoinColumns: [{ name: "specificationId" }],
	})
	specifications: Specification[];

	@CreateDateColumn()
	createdAt: Date;
	carExists: Promise<Specification[]>;

	constructor() {
		if (!this.id) {
			this.id = uuidv4();
			this.available = true;
		}
	}
}

export { Car };
