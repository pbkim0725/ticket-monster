import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";

import { authRouter } from "./routes/_routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const PORT = 4000;

const app = express();
app.use(json());
app.use(authRouter);

app.all("*", async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
	try {
		await mongoose.connect(
			"mongodb://auth-mongo-srv:27017/ticket-monster-auth",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}
		);
		console.log("Connected to MongoDB");
	} catch (err) {
		console.log(err);
	}
	app.listen(PORT, () => console.log(`Listening to Port ${PORT}`));
};

start();
