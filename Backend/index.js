const express = require("express");
const app = express();
const cors = require("cors");
const mongoose  = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/users.route");

const PORT = process.env.PORT || 2000;
const URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRouter);

mongoose.connect(URI).then(() => {
  console.log("connection to database successful.");
}).catch((err) => {
  console.log("Oops!, could not connect to database!");
});


app.listen(PORT, (err) => {
  if (err) {
    console.log("Oops! something went wrong")
  } else {
    console.log("We are up and running");
  }
});