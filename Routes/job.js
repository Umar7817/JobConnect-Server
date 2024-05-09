const express = require("express");
const { postJob, getPostedJob, updatePostedJob, deletPostedJob, getAllJobs,  applyForJob, getCandidate, appliedByCandidates, approveJob, makeProfile } = require("../Controller/job");
const { isLoggedIn } = require("../Middlewares/general");
const jobRoute = express.Router();


// All the CRUD operation for the Job
jobRoute.post("/post-job", isLoggedIn, postJob)
jobRoute.get("/get-jobs", isLoggedIn, getPostedJob)
jobRoute.put("/edit-jobs/:id", isLoggedIn, updatePostedJob)
jobRoute.delete("/delete-jobs/:id", isLoggedIn, deletPostedJob)
jobRoute.get("/get-all-jobs",  getAllJobs)

// Candidate Profile route
jobRoute.post("/update-profile", isLoggedIn, makeProfile )
jobRoute.get("/get-candidates", getCandidate )

// aprrove job

jobRoute.put("/approve-job/:id", isLoggedIn, approveJob)

// Apply for Job

jobRoute.put("/apply-job/:id", isLoggedIn, applyForJob)

jobRoute.get("/applied-by/:id", isLoggedIn, appliedByCandidates )

module.exports = jobRoute;
