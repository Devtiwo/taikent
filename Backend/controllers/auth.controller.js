const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fname, lname, email, password, phone, address, country } = req.body;
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
      phone,
      address,
      country,
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
      return res.send({
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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
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




module.exports = { register, login };
