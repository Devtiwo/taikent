const express = require("express");
const router = express.Router();
const { register, login, getDashboard } = require("../controllers/user.controller");

router.post("/signup", register);
router.post("/login", login);
router.get("/dashboard", getDashboard);

module.exports = router;