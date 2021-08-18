import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';

import {
	errorHandler,
	NotFoundError,
	currentUser,
} from '@prominentcode/common/build';

const app = express();
app.set('trust proxy', true); // traffic is being proxied through ingress-nginx
app.use(express.json());
app.use(
	cookieSession({
		signed: false, // maintaining cross-compatibility with other languages and frameworks
		secure: process.env.NODE_ENV !== 'test', // for testing; see comment in signup.test.ts
	})
);

app.use(currentUser);

app.use(createTicketRouter);

app.all('*', async (req, res) => {
	throw new NotFoundError();
});
app.use(errorHandler);

export { app };
