const express = require("express");
const router = express.Router();

const {
  registerPost,
  loginPost,
  logoutPost,
  contactUs,
} = require("../controllers/auth_controller");

router.post("/register", registerPost);

router.post("/login", loginPost);

router.get("/logout", logoutPost);

router.post("/send-message", contactUs);

module.exports = router;
