const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");

router.use(express.json());

router.post("/", auth.login);

module.exports = router;
