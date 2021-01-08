import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "./../errors/bad-request-error";
import { Password } from "../services/password";

const router = express.Router();

router.post(
	"/api/users/signin",
	[
		body("email").isEmail().withMessage("Please enter valid Email"),
		body("password")
			.trim()
			.isLength({ min: 4, max: 20 })
			.notEmpty()
			.withMessage("Please enter valid Password"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			throw new BadRequestError("Invalid Credentials");
		}

		const passwordMatch = await Password.compare(
			existingUser.password,
			password
		);

		if (!passwordMatch) {
			throw new BadRequestError("Invalid Credentials");
		}

		//Generate JWT
		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email,
			},
			process.env.JWT_KEY!
		);
		//Store session
		req.session = {
			jwt: userJwt,
		};

		res.status(201).send(existingUser);
	}
);

export { router as signinRouter };
