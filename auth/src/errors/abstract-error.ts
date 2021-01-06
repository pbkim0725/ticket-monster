export abstract class AbstractError extends Error {
	abstract statusCode: number;

	constructor(log: string) {
		super(log);
		Object.setPrototypeOf(this, AbstractError.prototype);
	}

	abstract serializeErrors(): { message: string; field?: string }[];
}
