import express from "express";

const app = express();
app.use(express.json());

// Desc: Get the current user
// method: GET
// body: -
// route: /api/users/currentuser
app.get('/api/users/currentuser', (req, res) => {
    res.send('Response from GET route')
})

// Desc: Signup for account
// method: POST
// body: { email: string, password: string }
// route: /api/users/signup

// Desc: Sign in to an account
// method: POST
// body: { email: string, password: string }
// route: /api/users/signin

// Desc: Sign out of an account
// method: POST
// body: {}
// route: /api/users/signout


app.listen(3000, () => {
    console.log("Auth Service listening on port 3000");
});
