const mongoose =  require("mongoose")

const jobDetails = new mongoose.Schema( {

    // jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, exprienceLevel, componyLogo, description, recruiterId

    jobTitle : {
        type: String,
        required : true
    },
    companyName : {
        type: String,
        required : true
    },
    minPrice : {
        type: String,
        required : true
    },
    maxPrice : {
        type: String,
        required : true
    },
    salaryType : {
        type : String,
        required : true
    },
    jobLocation : {
        type : String,
        required : true
    },
    experienceLevel : {
        type : String,
        required : true
    },
    componyLogo : {
        type : String
    },
    description : {
        type : String,
        required : true
    },
    recruiterId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Recruiter",
        required : true
    },
    isApproved :{ 
        type : Boolean,
        default : false
    },
    skills : {
        type : String,
        required : true
        
    }, 
    appliedBy : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "jobSeeker" 
        }
    ],

    
}, {timestamp : true})

module.exports = mongoose.model("Job", jobDetails)