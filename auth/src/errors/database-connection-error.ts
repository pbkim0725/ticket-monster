import { BaseError } from "./base-error";

export class DatabaseConnectionError extends BaseError {
	statusCode = 500;
	reason = "Error connecting to database";

	constructor() {
		super("Error has occured while connecting to database");

		//NOTE: if using built-in object...
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors() {
		return [{ message: this.reason }];
	}
}
