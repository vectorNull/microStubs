import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(201);
});

it("returns a 400 with an invalid email", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({
			email: "invalidEmail.com",
			password: "password",
		})
		.expect(400);
});

it("returns a 400 with an invalid password", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({
			email: "invalidEmail.com",
			password: "p",
		})
		.expect(400);
});

it("returns a 400 with missing email and passowrd", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
		})
		.expect(400);

	await request(app)
		.post("/api/users/signup")
		.send({
			password: "password",
		})
		.expect(400);
});

it("disallows duplicate emails", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(201);

	await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(400);
});

it("sets a cookie after successful signup", async () => {
	// will fail because in app.ts the cookieSession has
	// 'secure: true' property and jest is using http
	// set secure: process.env.NODE_ENV !== 'test'
	const response = await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(201);

	expect(response.get("Set-Cookie")).toBeDefined();
});
