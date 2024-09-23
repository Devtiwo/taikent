const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send({
        status: false,
        message: "Email already exist! Kindly login to your account.",
      });
    }
    let role = "user";
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail.includes(email)) {
      role = "admin";
    }
    const newUser = new userModel({
      fname,
      lname,
      email,
      password,
      roles: role,
    });
    await newUser.save();
    res.send({
      status: true,
      message: "Registeration Successful!",
    });
  } catch (err) {
    res.send({
      status: false,
      message: "An error occured! pls try again",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.send({
        status: false,
        message: "Email and password required!",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        status: false,
        message: "user does not exist. visit the signup page to register!",
      });
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.send({
        status: false,
        message: "Invalid login credentials!",
      });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({
      status: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.send({
      status: false,
      message: "An error occurred! check your internet connection",
    });
  }
};

const getDashboard = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, result) => {
    if (err) {
     return res.send({
        status: false,
        message: "token is invalid",
      });
    }
    try {
      const user = await userModel.findOne({ email: result.email });
      if (!user) {
        return res.send({
          status: false,
          message: "User not found",
        });
      } 
      return res.send({
        status: true,
        message: "token is valid",
        user: {
          firstName: user.fname,
        }
      });
    } catch (err) {
      return res.send({
        status: false,
        message: "server error! couldn't fetch user data",
      });
    }
  });
};

module.exports = { register, login, getDashboard };
