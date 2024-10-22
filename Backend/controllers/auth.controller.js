const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const transporter = require("../utilities/email");

const register = async (req, res) => {
  const { fname, lname, email, password, phone, address, country } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send({ status: false, message: "Email already exist! Kindly login to your account." });
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
    await transporter.sendMail({
      from: `Taikent <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Welcome to Taikent Investments",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #d3d3d3;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            p {
              color: #000000;
              line-height: 1.6;
              font-size: 16px;
            }
            @media (max-width: 600px) {
             .container {
                padding: 10px;
              }
            } 
          </style>
        </head>
        <body>
          <div class="container">
            <img src="https://taikentinvestments.com/images/taikent.png" alt="logo" />
            <p>Welcome ${fname},</p>
            <p>We are thrilled to have you join us. Start your investment journey by exploring the plans on your dashboard</p>
            <p>We are here to help if you need assistance.</p>
            <p>Regards,<br>Taikent Investment Team</p>
          </div>
        </body>
        </html>
      `
    });
    res.status(200).send({ status: true, message: "Registeration Successful!"});
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
    await transporter.sendMail({
      from: `Taikent <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Reset your account Password",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
           body {
             font-family: Arial, sans-serif;  
             margin: 0;
             padding: 0;
             background-color: #d3d3d3;
            }
           .container {
             max-width: 600px;
             margin: 0 auto;
             background: white;
             padding: 20px;
             border-radius: 5px;
             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
           img {
             margin: 10px auto;
            }
           h1 {
             color: #000000;
            }
           p {
             color: #000000;
             line-height: 1.6;
             font-size: 16px;
            }
           .button {
             display: inline-block;
             padding: 15px 30px;
             font-size: 16px;
             color: white;
             background-color: #000000;
             text-decoration: none;
             border-radius: 5px;
             transition: background-color 0.7s;
            }
           .button:hover {
             background-color: fuchsia;
             color: white;
            }
           @media (max-width: 600px) {
             .container {
                padding: 10px;
              }
             .button {
                width: 100%;
                text-align: center;
              }
            }
          </style>
       </head>
       <body>
       <div class="container">
          <img src="https://taikentinvestments.com/images/taikent.png" alt="logo" />
          <h1>Password Reset Request</h1>
          <p>Hi ${user.fname},</p>
          <p>This email is to confirm that you requested a password reset. To complete the password reset process, click the button below</p>
          <a href=${resetLink} class="button">Reset Password</a>
          <p>If you didn't request a password reset, please ignore this email.</p>
          <p>Thank you!</p>
       </div>
       </body>
       </html>
      `
    });
  res.status(200).send({ status: true, message: "Password reset link sent" });
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
    await transporter.sendMail({
      from: `Taikent <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Password changed successfully",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #d3d3d3;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            p {
              color: #000000;
              line-height: 1.6;
              font-size: 16px;
            }
            @media (max-width: 600px) {
             .container {
                padding: 10px;
              }
            } 
          </style>
        </head>
        <body>
          <div class="container">
            <img src="https://taikentinvestments.com/images/taikent.png" alt="logo" />
            <p>Hi ${user.fname},</p>
            <p>Your password has been changed successfully. If you didn't make this change, please contact our support immediately.</p>
            <p>Thanks for using our service.</p>
          </div>
        </body>
        </html>
      `
    });
    res.status(200).json({ message: "Password reset successful" });
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
