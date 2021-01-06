import { signinRouter } from "./signin";
import { signoutRouter } from "./signout";
import { signupRouter } from "./signup";
import { currentUserRouter } from "./current-user";

export const authRouter = [
	currentUserRouter,
	signinRouter,
	signoutRouter,
	signupRouter,
];
