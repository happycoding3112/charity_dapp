const express = require("express");
require("dotenv").config();
const multer = require("multer");
const cors = require("cors");
const registerRoutes = require("./routes/register");
const adminRoutes = require("./routes/admin");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Multer file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  return res.status(200).json(file.filename);
});

// Routes
app.use("/api/register", registerRoutes);
app.use("/api/admin", adminRoutes);

app.listen("8080", () => {
  console.log("App started!");
});
