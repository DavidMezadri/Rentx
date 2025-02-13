import { AppDataSource } from "./data-source";

AppDataSource.initialize()
	.then(async () => {
		console.log("Data Source initialized successfully!");
	})
	.catch((error) => {
		console.error("Error initializing Data Source:", error);
	});
