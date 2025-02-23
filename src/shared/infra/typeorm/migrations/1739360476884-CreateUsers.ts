import { type MigrationInterface, type QueryRunner, Table } from "typeorm";

export class CreateUsers1739360476884 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "users",
				columns: [
					{
						name: "id",
						type: "uuid",
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "username",
						type: "varchar",
						isUnique: true,
					},
					{
						name: "password",
						type: "varchar",
					},
					{
						name: "email",
						type: "varchar",
					},
					{
						name: "driverLicense",
						type: "varchar",
					},
					{
						name: "isAdmin",
						type: "boolean",
						default: false,
					},
					{
						name: "createdAt",
						type: "timestamp",
						default: "now()",
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}
}
