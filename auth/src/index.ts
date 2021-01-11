import mongoose from "mongoose";
import { app } from "./app";

const PORT = 4000;

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error("JWTKEY not defined");
	}

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
