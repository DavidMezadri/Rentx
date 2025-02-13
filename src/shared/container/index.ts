import { container } from "tsyringe";

import type { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import type { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import type { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";

//ICategroriesRepository
container.registerSingleton<ICategoriesRepository>(
	"CategoriesRepository",
	CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
	"SpecificationRepository",
	SpecificationRepository,
);

container.registerSingleton<IUsersRepository>(
	"UsersRepository",
	UsersRepository,
);
