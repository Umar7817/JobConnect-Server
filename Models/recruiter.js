const mongoose = require("mongoose")

const recruiterSchema = new mongoose.Schema( {
    companyName : {
        type : String,
        required : true
    },
    companyEmail : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    verified : {
        type : Boolean,
        default : false,
    },


})

module.exports = mongoose.model("Recruiter", recruiterSchema)