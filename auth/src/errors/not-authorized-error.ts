import { BaseError } from "./base-error";

export class NotAuthorizedError extends BaseError {
	statusCode = 401;

	constructor() {
		super("Not Authorized");

		Object.setPrototypeOf(this, NotAuthorizedError);
	}

	serializeErrors() {
		return [{ message: "Not Authorized" }];
	}
}
