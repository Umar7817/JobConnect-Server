const express = require("express");
const {login, register, recruiterLogin, recruiterRegister} = require("../Controller/auth");
const authRoute = express.Router();


// Route for Candidate
authRoute.post("/login", login)
authRoute.post("/signup", register)


// Route for the Recruiter
authRoute.post("/recruiter-login", recruiterLogin)
authRoute.post("/recruiter-register", recruiterRegister)

module.exports = authRoute;
