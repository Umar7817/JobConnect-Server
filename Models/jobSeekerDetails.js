const mongoose = require("mongoose")

const jobSeekerDetails = new mongoose.Schema({
    // name, mobile, experience, jobProfile, notice period, description, resume link

    //   fullName, mobileNumber, jobProfile, noticePeriod, description, resumeLink, candidateId
    fullName : {
        type : String,
        required : true
    },
    mobileNumber : {
        type : Number,
        required : true
    },
    jobProfile : {
        type : String,
        required : true
    },
    noticePeriod : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    resumeLink : {
        type : String,
        required : true
    },
    candidateId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "jobSeeker",
        required : true
    }


})

module.exports = mongoose.model("jobSeekerDetails", jobSeekerDetails)