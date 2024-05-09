const jobSeeker = require("../Models/user");
const Recruiter = require("../Models/recruiter")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const SECRET_KEY = process.env.SECRET_KEY


const register = async (req, res) => {

const { name, email, password } = req.body;


    try {
      const alreadyUser = await jobSeeker.findOne({ email: email });
      if (alreadyUser) {
        return res
          .status(400)
          .json({ success: false, message: "already a user" });
      }
  
      const hasPassword = await bcrypt.hash(password, 10);
  
      const result = await jobSeeker.create({
        name: name,
        password: hasPassword,
        email: email
      });
  
      // const token = jwt.sign({ id: result._id }, "VERIFYEMAIL");
  
      // // sending the mail
      // let mailTransporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: "us42534@gmail.com",
      //     pass: "hnvg irga gkla wawb",
      //   },
      // });
  
      // let mailDetails = {
      //   from: "us42534@gmail.com",
      //   to: result.email,
      //   subject: "Activate Your Account",
      //   html: `
      //   <h1>Welcome in Todos! </h1>
      //   <a href="http://localhost:5000/users/activate-account/${token}"> Click to verify your email</a>
      //   `,
      // };
  
      // await mailTransporter.sendMail(mailDetails);
  
      res
        .status(201)
        .json({
          success: true,
          message: "Your Account is Created!",
        });
  } catch (error) {
    res.status(404).json({success : false, message : error.message})
  }
};


const login = (req, res) => {
  const { email, password } = req.body;

  jobSeeker.findOne({email : email})
  .then((user) => {
    if(!user) 
      return res.status(401).json({ success : false,  message : "invalid email"})

    // if(user.verified == false) 
    //   return res.status(401).json({ success : false,  message : "please verify email first"})

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign( {
          _id : user._id,
          name : user.name
        }, SECRET_KEY);

        return res.status(200).json({
          success : true,
          message : "Logged in Success",
          token,
          name : user.name,
          _id : user._id
        })
      }

      else {
        return res.status(401).json({ success : false, message : "Invalid Password"})
      }
    })
    
  })
  .catch((err) => 
    res.status(500).json({
      success: false,
      message : err.message
    })
  )


};

// auth for the Recruiter

const recruiterRegister = async (req, res) => {
  const { companyName, companyEmail, password } = req.body;


    try {
      const alreadyUser = await Recruiter.findOne({ companyEmail: companyEmail });
      if (alreadyUser) {
        return res
          .status(400)
          .json({ success: false, message: "already a user" });
      }
  
      const hasPassword = await bcrypt.hash(password, 10);
  
      const result = await Recruiter.create({
        companyName: companyName,
        password: hasPassword,
        companyEmail: companyEmail
      });
  
      const token = jwt.sign({ id: result._id }, "VERIFYEMAIL");
  
      // // sending the mail
      // let mailTransporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: "us42534@gmail.com",
      //     pass: "hnvg irga gkla wawb",
      //   },
      // });
  
      // let mailDetails = {
      //   from: "us42534@gmail.com",
      //   to: result.email,
      //   subject: "Activate Your Account",
      //   html: `
      //   <h1>Welcome in Todos! </h1>
      //   <a href="http://localhost:5000/users/activate-account/${token}"> Click to verify your email</a>
      //   `,
      // };
  
      // await mailTransporter.sendMail(mailDetails);
  
      res
        .status(201)
        .json({
          success: true,
          message: "Your Account is Created",
        });
  } catch (error) {
    res.status(404).json({success : false, message : error.message})
  }

}

const recruiterLogin = async (req, res) => {
  const { companyEmail, password } = req.body;

  Recruiter.findOne({companyEmail : companyEmail})
  .then((user) => {
    if(!user) 
      return res.status(401).json({ success : false,  message : "invalid email"})

    // if(user.verified == false) 
    //   return res.status(401).json({ success : false,  message : "please verify email first"})

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign( {
          _id : user._id,
          name : user.companyName
        }, SECRET_KEY);

        return res.status(200).json({
          success : true,
          message : "Logged in Success",
          token,
          name : user.companyName
        })
      }

      else {
        return res.status(401).json({ success : false, message : "Invalid Password"})
      }
    })
    
  })
  .catch((err) => 
    res.status(500).json({
      success: false,
      message : err.message
    })
  )


}


module.exports = { login, register, recruiterLogin, recruiterRegister }
