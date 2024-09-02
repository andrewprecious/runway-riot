const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const validator = require("validator");
const nodemailer = require("nodemailer");
require("dotenv").config();

const User = require("../models/auth_model");

// encrypt password
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
};
// decrypt password
const decryptPassword = (password) => {
  return CryptoJS.AES.decrypt(password, process.env.PASS_SEC).toString(
    CryptoJS.enc.Utf8
  );
};
// register
const registerPost = async (req, res) => {
  // collect the username ... from the form/model
  const { username, email, password } = req.body;

  // checks if all required fields are filled
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    // check if email is already existing
    const emailIsExisting = await User.findOne({ email: email });
    if (emailIsExisting) {
      return res.status(400).json({ message: "Email is already in use!" });
    }
    // if all checks pass create a new user
    const newUser = new User({
      username: username,
      email: email,
      password: encryptPassword(password),
    });
    // save user
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    console.log(err);
  }
};
// login
const loginPost = async (req, res) => {
  //   take username... from form
  const { email, password } = req.body;
  // check is all required fields are filled
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check if email is registered
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Email is not registered" });
    }
    // decrypt the encrypted password
    // go to database and decrypt the encrypted password
    const decryptedPassword = decryptPassword(user.password);

    // checks if the decrypted password matches with the password typed
    const isPasswordCorrect = decryptedPassword === password;
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "wrong credentials" });
    }
    // create a accesstoken
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, // User Information
      process.env.JWT_SEC, // jwt secret
      {
        expiresIn: "1d", // time of automatically loggoing out user
      }
    );

    // extract the password from the user info before swnding a response
    const { password: userPassword, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
// logout
const logoutPost = (req, res) => {
  res.send("logout page");
};
// contact us
const contactUs = async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Received form data:", { name, email, message }); // Debugging line

  // Check if the email field is empty
  if (!email) {
    return res.status(400).json({ message: "No email address provided." });
  }

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Your message has been sent successfully!" });
  } catch (err) {
    console.log("Error sending email:", err);
    res
      .status(500)
      .json({ message: "There was an error sending your message." });
  }
};

module.exports = {
  registerPost,
  loginPost,
  logoutPost,
  contactUs,
};
