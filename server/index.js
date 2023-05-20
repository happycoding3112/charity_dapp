const express = require("express");
require("dotenv").config();
const multer = require("multer");
const cors = require("cors");
const nodemailer = require("nodemailer");
const registerRoutes = require("./routes/register");
const adminRoutes = require("./routes/admin");
const loginRoutes = require("./routes/login.js");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Multer file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../admin/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/clientUploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadImg = multer({ storage: imageStorage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  return res.status(200).json(file.filename);
});

app.post("/api/upload/campaignImage", uploadImg.single("file"), (req, res) => {
  const file = req.file;
  return res.status(200).json(file.filename);
});

// Routes
app.use("/api/register", registerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/login", loginRoutes);

app.listen("8080", () => {
  console.log("App started!");
});
