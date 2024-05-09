const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");
const JobSeeker = require("../models/jobSeekerModel");
const JobSeekerDetails = require("../models/jobSeekerDetailsModel");

// Define endpoint to get job seekers who applied for a specific job
router.get("/job/:jobId/applicants", async (req, res) => {
    try {
        // Get the job ID from the request parameters
        const jobId = req.params.jobId;

        // Find the job by its ID
        const job = await Job.findById(jobId);

        // If job not found, return an error response
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        // Retrieve the IDs of job seekers who applied for this job
        const appliedByJobSeekerIds = job.appliedBy;

        // Find the job seekers based on their IDs
        const jobSeekers = await JobSeeker.find({ _id: { $in: appliedByJobSeekerIds } });

        // Now let's get the job seeker details for each job seeker
        const jobSeekersDetails = [];
        for (const jobSeeker of jobSeekers) {
            const jobSeekerDetail = await JobSeekerDetails.findOne({ candidateId: jobSeeker._id });
            if (jobSeekerDetail) {
                jobSeekersDetails.push(jobSeekerDetail);
            }
        }

        // Return the list of job seekers and their details who applied for this job
        res.json(jobSeekersDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
