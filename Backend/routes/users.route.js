const express = require("express");
const router = express.Router();
const { getDashboard, changePassword, updateProfile, recordPayment, getAllUsers, updateBalances } = require("../controllers/users.controller");

router.get("/dashboard", getDashboard);
router.post("/changepassword", changePassword);
router.put("/updateprofile", updateProfile);
router.post("/payment", recordPayment);
router.get("/allusers", getAllUsers);
router.patch("/:id/balances", updateBalances)

module.exports = router