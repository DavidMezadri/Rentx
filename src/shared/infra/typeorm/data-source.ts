import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: 5432,
	username: "docker",
	password: "ignite",
	database: "rentx",
	synchronize: false,
	logging: false,
	entities: [
		"./src/modules/cars/infra/typeorm/entities/*.ts",
		"./src/modules/accounts/infra/typeorm/entities/*.ts",
	],
	migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
	subscribers: [],
});
