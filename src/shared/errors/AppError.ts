export class AppError {
	public readonly message: string;

	public readonly statusCod: number;

	constructor(message: string, statusCode = 400) {
		this.message = message;
		this.statusCod = statusCode;
	}
}
