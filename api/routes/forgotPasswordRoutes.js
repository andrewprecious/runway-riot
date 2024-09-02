const express = require("express");
const router = express.Router();

const {
  forgottenPassword,
  resetPassword,
} = require("../controllers/forgotPasswordController");

router.post("/forgottenPassword", forgottenPassword);

router.post("/resetPassword", resetPassword);

module.exports = router;
