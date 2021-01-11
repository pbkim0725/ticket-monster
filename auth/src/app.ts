import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { authRouter } from "./routes/_routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
	cookieSession({
		signed: false, // do not encrypt
		secure: process.env.NODE_ENV !== "test",
	})
);
app.use(authRouter);

app.all("*", async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
