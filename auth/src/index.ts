import express from "express";

import { currentUserRouter } from "./routes/current-user";
import { signupUserRouter } from "./routes/signup";
import { signinUserRouter } from "./routes/signin";
import { signoutUserRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";

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

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Auth Service listening on port 3000");
});
