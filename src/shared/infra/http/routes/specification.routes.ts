import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../../../../modules/cars/useCases/listSpecification/ListSpecificationsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();

specificationRoutes.post(
	"/",
	ensureAuthenticated,
	ensureAdmin,
	createSpecificationController.handle,
);

specificationRoutes.get("/", listSpecificationController.handle);

export { specificationRoutes };
