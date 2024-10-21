const express = require("express");
const app = express();
const cors = require("cors");
const mongoose  = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/users.route");
const authRouter = require("./routes/auth.route");

const PORT = process.env.PORT;
const URI = process.env.MONGO_URI || 2000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use("/user", userRouter);
app.use("/auth", authRouter);

mongoose.connect(URI).then(() => {
  console.log("we are live and ready to go.");
}).catch((err) => {
  console.error("Oops!, could not connect to database!", err);
});


app.listen(PORT, (err) => {
  if (err) {
    console.log("Oops! something went wrong");
  } else {
    console.log("We are up and running");
  }
});