const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute");
const blogRoute = require("./routes/blogRoute");
const forgottenPasswordRoutes = require("./routes/forgotPasswordRoutes");
const cors = require("cors");

const port = 5001;

// env
dotenv.config();

app.use(express.urlencoded({ extended: true }));

// to use json in express
app.use(express.json());

// set up cors
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://runwayriot.onrender.com",
    "http://runwayriotadmin.onrender.com",
  ],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  optionSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connceted to mongodeb successfully");

    app.listen(port, () => {
      console.log(`Listening to request coming from ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//   routes
app.use("/account", authRoute);
app.use("/blog", blogRoute);
app.use("/user", forgottenPasswordRoutes);
