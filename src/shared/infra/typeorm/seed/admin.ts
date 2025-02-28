import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";

import { AppDataSource } from "../data-source";

async function create() {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
		console.log("nao estava inciado!");
	}

	const id = uuidv4();
	const password = await hash("admin", 8);

	await AppDataSource.query(
		`INSERT INTO USERS (id, name, email, password, "isAdmin", "createdAt", "driverLicense")
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', '1234')`,
	);
}

create().then(() => console.log("User admin created!"));
