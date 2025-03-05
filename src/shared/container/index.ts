import { container } from "tsyringe";

import "./providers/index";

import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import type { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { CarsImagesRepository } from "../../modules/cars/infra/typeorm/repositories/CarsImageRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository";
import type { ICarsImagesRepository } from "../../modules/cars/repositories/ICarsImagesRepository";
import type { ICarsRepository } from "../../modules/cars/repositories/ICarsRepostory";
import type { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import type { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";
import { RentalsRepository } from "../../modules/rentals/infra/typeorm/repositories/RentalsRepository";
import type { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";

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

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
	"CarsImagesRepository",
	CarsImagesRepository,
);

container.registerSingleton<IRentalsRepository>(
	"RentalsRepository",
	RentalsRepository,
);
