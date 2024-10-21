const userModel  = require("../models/user.model");
const jwt = require("jsonwebtoken");

const getDashboard = async (req, res) => {
  let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.send({
        status: false,
        message: "token is invalid",
      });
    }
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(result.userId);
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
          userId: user._id,
          firstName: user.fname,
          lastName: user.lname,
          email: user.email,
          phone: user.phone,
          address: user.address,
          country: user.country,
          roles: user.roles
        },
      });
    } catch (err) {
      console.error(err)
      return res.status(500).send({
        status: false,
        message: "server error! couldn't fetch user data",
      });
    }
};

const changePassword = async (req, res) => {
  const { current, newp, confirmP } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(result.userId);
    if (!user) {
      return res.status(404).send({ status: false, message: "User not found" });
    }

    if (newp !== confirmP) {
      return res
        .status(400)
        .send({
          status: false,
          message: "New password and confirm password do not match",
        });
    }

    if (newp === confirmP) {
      return res
        .status(400)
        .send({
          status: false,
          message: "New password cannot be same as current password",
        });
    }

    const isMatch = await user.validatePassword(current);
    if (!isMatch) {
      return res
        .status(401)
        .send({ status: false, message: "Current password is incorrect!" });
    }

    user.password = newp;
    await user.save();
    return res.send({ status: true, message: "Password changed successfully" });
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res
        .status(401)
        .send({ status: false, message: "Token is invalid" });
    }
    return res
      .status(500)
      .send({ status: false, message: "Server error! Please try again" });
  }
};

const updateProfile = async (req, res) => {
  const { fname, lname, email, phone, address, country } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    const updatedUser = await userModel.findByIdAndUpdate(
      result.userId,
      { fname, lname, email, phone, address, country },
      {new: true, runValidators: true}
    );
    if (!updatedUser) {
      return res.status(404).send({
        status: false,
        message: "user not found"
      });
    }
    return res.send({
      status: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      status: false,
      message: "Error occured while updating your profile"
    });
  }
};

const recordPayment =  async (req, res) => {
  const { userId, planName, amount, btcEquivalent} = req.body;
  try {
    const paymentInfo = {
      planName,
      amount,
      btcEquivalent
    };
    await userModel.findByIdAndUpdate(userId, { $push: { payments: paymentInfo } });
    res.status(201).send({
      status: true,
      message: "Payment processed successfully!"
    })
  } catch(err) {
    res.status(500).send({
      status: false,
      message: "Error! Pls try again."
    })
  }
};

module.exports = { getDashboard, changePassword, updateProfile, recordPayment };