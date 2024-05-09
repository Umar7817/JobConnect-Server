const Job = require("../Models/job")
const jobSeekerDetails = require("../Models/jobSeekerDetails")
const jobSeeker =  require("../Models/user")
// const jobSeekerDetails = require("../Models/jobSeekerDetails")

// CRUD Operation for the Job portal

const postJob = async (req, res) => {
    const {
        jobTitle,
        companyName,
        minPrice,
        maxPrice,
        salaryType,
        jobLocation,
        experienceLevel,
        componyLogo,
        description,
        recruiterId,
        skills
    } = req.body;

    

    const newJob = new Job({
        jobTitle,
        companyName,
        minPrice,
        maxPrice,
        salaryType,
        jobLocation,
        experienceLevel,
        componyLogo,
        description,
        recruiterId: req.userId, // Assuming req.userId is correct
        skills
    });

    try {
        await newJob.save();
        res.status(201).json({ success: true, job: newJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

const getPostedJob = async (req, res) => {
    try {
        const jobs = await Job.find({ recruiterId : req.userId})
        res.status(201).json(jobs)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success : false, message : "something went wrong"})
    }
    
}

const updatePostedJob = async (req, res) => {
    const _id = req.params.id
    const { jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, exprienceLevel, componyLogo, description, recruiterId } = req.body

    const updatedJob = {
        jobTitle : jobTitle,
        companyName : companyName,
        minPrice : minPrice,
        maxPrice : maxPrice,
        salaryType : salaryType,
        jobLocation : jobLocation,
        exprienceLevel : exprienceLevel,
        componyLogo : componyLogo,
        description : description,
        recruiterId : req.userId
    }

    try {

        await Job.findByIdAndUpdate(_id, updatedJob, { new : true})
        res.status(201).json(updatedJob)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success : false, message : "something went wrong"})
    }
    
}

const deletPostedJob = async (req, res) => {
    const _id = req.params.id
    try {
        const deletedNote = await Job.findByIdAndDelete(_id)
        res.status(201).json(deletedNote)

    } catch (error) {
        console.log(error)
        res.status(500).json({ success : false, message : "something went wrong"})
    }
}

const getAllJobs = async (req, res) => {
    try {
        const allJobs = await Job.find()
        res.status(201).json(allJobs)

    } catch (error) {
        console.log(error)
        res.status(500).json({ success : false, message : "something went wrong"})
    }

}

// Apply for the job 

const applyForJob = async (req, res) => {
    const jobId = req.params.id;

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        const alreadyApplied = job.appliedBy.includes(req.userId);

        if (alreadyApplied) {
            return res.status(400).json({ success: false, message: "Job seeker already applied" });
        }

        job.appliedBy.push(req.userId);
        await job.save();

        res.status(201).json({ success: true, message: "Applied Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}


const appliedByCandidates = async (req, res) => {
    try {
        // Get the job ID from the request parameters
        const jobId = req.params.id;

        // Find the job by its ID
        const job = await Job.findById(jobId);

        // If job not found, return an error response
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        // Retrieve the IDs of job seekers who applied for this job
        const appliedByJobSeekerIds = job.appliedBy;

        // Find the job seekers based on their IDs
        const jobSeekers = await jobSeeker.find({ _id: { $in: appliedByJobSeekerIds } });

        // Now let's get the job seeker details for each job seeker
        const jobSeekersDetails = [];
        for (const jobSeeker of jobSeekers) {
            const jobSeekerDetail = await jobSeekerDetails.findOne({ candidateId: jobSeeker._id });
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
}


// approve Job

const approveJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find the job by ID and update the isApproved field
        const job = await Job.findByIdAndUpdate(jobId, { isApproved: true }, { new: true });

        // Check if the job with the given ID exists
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // Send the updated job as a response
        res.json(job);
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Candidate Profile funcation

const makeProfile = async (req, res) => {

    const {fullName, mobileNumber, jobProfile, noticePeriod, description, resumeLink, candidateId } = req.body

    const existingProfile = await jobSeekerDetails.findOne({ candidateId: req.userId });

    // If profile data already exists, return a response indicating that data is available
    if (existingProfile) {
        return res.status(400).json({ success: false, message: "Profile data already exists for this user" });
    }

    // If profile data doesn't exist, proceed with creating a new profile 

    // Check if all required fields are present
    if (!fullName || !mobileNumber || !jobProfile || !noticePeriod || !description || !resumeLink) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const updatePro = new jobSeekerDetails({
        fullName : fullName,
        mobileNumber : mobileNumber,
        jobProfile : jobProfile,
        noticePeriod : noticePeriod,
        description : description,
        resumeLink : resumeLink,
        candidateId : req.userId
    })

    try {
        await updatePro.save();
        res.status(201).json(updatePro)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success : false, message : "something went wrong"})
    }
}

const getCandidate = async (req, res ) => {
    try {
        const candidate = await jobSeekerDetails.find()
        res.status(201).json(candidate)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success : false, message : "something went wrong"})
        
    }

}



module.exports = { postJob, getPostedJob, updatePostedJob, deletPostedJob, getAllJobs, makeProfile, applyForJob, getCandidate, appliedByCandidates, approveJob}