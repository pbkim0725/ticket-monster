import express from "express";
import "express-async-errors";

import { json } from "body-parser";
import { errorHandler } from "./middlewares/error-handler";
import { authRouter } from "./routes/_routes";
import { NotFoundError } from "./errors/not-found-error";

const PORT = 4000;

const app = express();
app.use(json());
app.use(authRouter);

app.all("*", async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening to Port ${PORT}`));
