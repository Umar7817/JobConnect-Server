const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./Routes/auth");
const bodyParser = require("body-parser");
const jobRoute = require("./Routes/job");
const dotenv = require("dotenv")

dotenv.config()

// Setup app 
const app = express();




// using Middlewares
// app.use(express.json());
app.use(bodyParser.json())
app.use(cors())

// Route setup
app.use("/auth", authRoute)
app.use("/job", jobRoute)

// Database Connection
mongoose.connect(process.env.Mongo_URL)
.then( () => {
    console.log("database Connected")
})
.catch( err => console.log(err.message))


// Server Listen
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server started on port" + PORT)
} )


// 4gZgH3ns49hOWr33