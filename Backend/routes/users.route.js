const express = require("express");
const router = express.Router();
const { getDashboard, changePassword, updateProfile } = require("../controllers/users.controller");

router.get("/dashboard", getDashboard);
router.post("/changepassword", changePassword);
router.put("/updateprofile", updateProfile);

module.exports = router