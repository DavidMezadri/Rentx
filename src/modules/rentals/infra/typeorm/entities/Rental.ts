import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("rentals")
class Rental {
	@PrimaryColumn()
	id: string;

	@Column()
	carId: string;

	@Column()
	userId: string;

	@Column()
	startDate: Date;

	@Column()
	endDate: Date;

	@Column()
	expectedReturnDate: Date;

	@Column()
	total: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updateAt: Date;

	constructor() {
		if (!this.id) {
			this.id = uuidv4();
		}
	}
}

export { Rental };
