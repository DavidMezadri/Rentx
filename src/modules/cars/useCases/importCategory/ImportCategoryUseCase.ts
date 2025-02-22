import fs from "node:fs";
import { parse as csvParse } from "csv-parse";
import { inject, injectable } from "tsyringe";
import type { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
	name: string;
	description: string;
}
@injectable()
class ImportCategoryUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoryRepository: ICategoriesRepository,
	) {}

	loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			// stram necessário pois vai quebrar o arquivo em chunks, bom pra arquivos grandes
			const stream = fs.createReadStream(file.path); //criando uma stream de leitura com o caminho(file.path)
			const categories: IImportCategory[] = [];

			const parseFile = csvParse(); //instacioamos a funcao

			stream.pipe(parseFile); // a cada pedaço lido pelo pipe, passa pro parser

			parseFile.on("data", async (line) => {
				//responsavel a ler linha por linha do arquivo, por padrao ja pega a , como separador
				// ["name", "description"]
				const [name, description] = line;
				categories.push({
					name,
					description,
				});
			});
			parseFile.on("end", () => {
				fs.promises.unlink(file.path);
				resolve(categories);
			});
			parseFile.on("error", (err) => {
				reject(err);
			});
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);

		categories.map(async (category) => {
			const { name, description } = category;

			const existCategory = await this.categoryRepository.findByName(name);

			if (!existCategory) {
				await this.categoryRepository.create({
					name,
					description,
				});
			}
		});
	}
}

export { ImportCategoryUseCase };
