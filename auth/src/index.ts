import express from "express";
import "express-async-errors";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signupUserRouter } from "./routes/signup";
import { signinUserRouter } from "./routes/signin";
import { signoutUserRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(express.json());

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

const start = async () => {
	try {
		await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
        console.log('Connected to MongoDB...');
	} catch (err) {
		console.error(err);
	}
	app.listen(3000, () => {
		console.log("Auth Service listening on port 3000");
	});
};

start();
