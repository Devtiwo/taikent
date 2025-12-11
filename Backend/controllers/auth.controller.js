const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
// const { sendEmail } = require("../utilities/email");
// const { welcomeEmail } = require("../utilities/emailtemplates/welcomeEmail");
// const { forgotPasswordEmail } = require("../utilities/emailtemplates/forgotPassword");
// const { passwordChangedEmail } = require("../utilities/emailtemplates/passwordChanged");

const register = async (req, res) => {
  const { fname, lname, email, password, phone, address, country } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ status: false, message: "Email already exist! Kindly login to your account." });
    }
    let role = "user";
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail.includes(email)) {
      role = "admin";
    }
    const newUser = new userModel({
      fname, lname, email, password, phone, address, country, roles: role,
    });
    await newUser.save();
    res.status(200).send({ status: true, message: "Registeration Successful!"});
  //   sendEmail(newUser.email, "Welcome to Taikent Investments", welcomeEmail(newUser.fname))
  //  .catch(err => console.error("Failed to send welcome email:", err));
  } catch (err) {
    res.status(500).send({ status: false, message: "An error occured! pls try again" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.send({ status: false, message: "Email and password required!" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({ status: false, message: "user does not exist. visit the signup page to register!" });
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.send({ status: false, message: "Invalid login credentials!" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    res.send({ status: true, message: "Login successful", token, user: { id: user._id, role: user.roles } });
  } catch (err) {
    res.send({ status: false, message: "An error occurred! check your internet connection" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ status: false, message: "Email is not registered!" });
    }
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.resetToken = resetToken;
    user.tokenExpires = Date.now() + 3600000;
    await user.save();
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    res.status(200).send({ status: true, message: "Password reset link sent" });
  //   sendEmail(user.email, "Password Reset Request", forgotPasswordEmail(user.fname, resetLink))
  //  .catch(err => console.error("Failed to send welcome email:", err));
  } catch (err) {
    console.error(err)
    res.status(500).send({ status: false, message: "Server error!, Pls try again" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({_id: result.userId, resetToken: token, tokenExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).send({ status: false, message: "Reset link has expired" });
    }
    user.password = password;
    user.resetToken = undefined;
    user.tokenExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  //   sendEmail(user.email, "Password Reset Successfull", passwordChangedEmail(user.fname))
  //  .catch(err => console.error("Failed to send welcome email:", err));
  } catch (err) {
    if (err.name === "TokenExpiredError") {
    return res.status(400).send({ status: false, message: "Reset link has expired. Please request a new one." });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(400).send({ status: false, message: "Invalid reset link" });
    }
    res.status(500).send({ status: false, message: "Server error! Please try again."});
  }
};

module.exports = { register, login, forgotPassword, resetPassword };
