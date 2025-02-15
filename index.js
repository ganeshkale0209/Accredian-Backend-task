const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createReferral } = require("./referralController");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Debugging: Log every request
app.use((req, res, next) => {
  console.log(`➡️ Incoming request: ${req.method} ${req.url}`);
  console.log("📩 Request body:", req.body);
  next();
});

app.post("/api/referral", async (req, res) => {
  try {
    await createReferral(req, res);
  } catch (error) {
    console.error("❌ Error:", error.message); // Log error
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
