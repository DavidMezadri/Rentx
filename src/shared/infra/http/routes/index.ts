import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { carsRoutes } from "./cars.raouter";
import { specificationRoutes } from "./specification.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specification", specificationRoutes);
router.use(authenticateRoutes);

export { router };
