const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let saltRound = 10;

const userSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  country: { type:String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: { type: String },
  tokenExpires: { type: Date },
  plan: { type: String, default: 0 },
  balance: { type: Number, default: 0 },
  profit: { type: Number, default: 0 },
  withdrawBal: { type: Number, default: 0 },
  payments: [{
    planName: { type: String, required: true },
    amount: { type: Number, required: true },
    btcEquivalent: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  }],
  roles: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});

userSchema.pre("save", async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, saltRound);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

userSchema.methods.validatePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error("Password validation error");
  }
};
 
const userModel = mongoose.model("users", userSchema, "users");

module.exports = userModel;