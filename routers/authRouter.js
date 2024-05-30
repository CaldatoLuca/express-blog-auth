const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");

router.post("/", express.json(), auth.login);

module.exports = router;
