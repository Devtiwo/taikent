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
    const newUser = new userModel({ fname, lname, email, password, roles: role, });
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

module.exports = { register };