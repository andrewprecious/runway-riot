const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const validator = require("validator");
const nodemailer = require("nodemailer");
const User = require("../models/auth_model");

// function to encrypt password
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "oghenerookerri@gmail.com",
    pass: "qmtedgblfmsjmysr",
  },
});

const forgottenPassword = async (req, res) => {
  try {
    // extract email from the form
    const { email } = req.body;
    // check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    // check if email is registered
    const isEmailExisting = await User.findOne({ email: email });
    if (!isEmailExisting) {
      return res.status(400).json({ message: "Email is not registered" });
    }
    // generate a token
    const token = jwt.sign({ email }, process.env.JWT_SEC, {
      expiresIn: "35m",
    });
    // sending a password reset link to the user
    const resetPasswordLink = `http://localhost:5001/user/resetPassword/${token}`;
    // mailoptions
    const mailOptions = {
      from: "oghenerookerri@gmail.com",
      to: email,
      subject: "reset your password",
      text: `To reset your password, click on this link ${resetPasswordLink}`,
      html: ` <div style="background-color: rgb(238, 237, 237); padding: 20px;"><p style="color: black; background-color: white; padding: 15px; line-height: 2.0; border-radius: 10px;">You are receiving this email because you requested a password change. To reset your password, click on the following link: ${resetPasswordLink}. This link will expire in 35-minutes</p></div>`,
    };

    // sending the mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Failed to reset email. Please try again later!" });
      } else {
        console.log(info);
        res.json({ message: "Mail sent successfully" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    // verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SEC);

    if (!decoded) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = encryptPassword(password);

    const user = await User.findOne({ email: decoded.email });
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error! It seems your reset link has expired",
    });
  }
};

module.exports = {
  forgottenPassword,
  resetPassword,
};
