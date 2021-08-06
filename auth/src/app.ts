import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signupUserRouter } from "./routes/signup";
import { signinUserRouter } from "./routes/signin";
import { signoutUserRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true); // traffic is being proxied through ingress-nginx
app.use(express.json());
app.use(
	cookieSession({
		signed: false, // maintaining cross-compatibility with other languages and frameworks
		secure: true, // https
	})
);

// Desc: Get the current user
// method: GET
// body: -
// route: /api/users/currentuser
app.use(currentUserRouter);

// Desc: Signup for account
// method: POST
// body: { email: string, password: string }
// route: /api/users/signup
app.use(signupUserRouter);

// Desc: Sign in to an account
// method: POST
// body: { email: string, password: string }
// route: /api/users/signin
app.use(signinUserRouter);

// Desc: Sign out of an account
// method: POST
// body: {}
// route: /api/users/signout
app.use(signoutUserRouter);

app.all("*", async (req, res) => {
	throw new NotFoundError();
});
app.use(errorHandler);

export { app };