export abstract class BaseError extends Error {
	abstract statusCode: number;

	constructor(log: string) {
		super(log);
		Object.setPrototypeOf(this, BaseError.prototype);
	}

	abstract serializeErrors(): { message: string; field?: string }[];
}
