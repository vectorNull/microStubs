import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { errorHandler } from '@prominentcode/common/build';
import { NotFoundError } from '@prominentcode/common/build';

const app = express();
app.set('trust proxy', true); // traffic is being proxied through ingress-nginx
app.use(express.json());
app.use(
	cookieSession({
		signed: false, // maintaining cross-compatibility with other languages and frameworks
		secure: process.env.NODE_ENV !== 'test', // for testing; see comment in signup.test.ts
	})
);



app.all('*', async (req, res) => {
	throw new NotFoundError();
});
app.use(errorHandler);

export { app };
