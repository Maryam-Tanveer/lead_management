const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const leadRoutes = require("./routes/leads");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log(err));

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = (username || "").trim();
  const pass = (password || "").trim();
  
  if (user === "admin" && pass === "admin123") {
    res.json({ token: "fake-jwt-token", user: "admin" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.use("/api/leads", leadRoutes);

module.exports = app;