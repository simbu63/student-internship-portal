require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Student Internship Portal API is running"
  });
});

app.use("/api", apiRoutes);

async function startServer() {
  try {
    if (!process.env.MONGO_DB_URI) {
      throw new Error("MONGO_DB_URI is missing from the environment");
    }

    await mongoose.connect(process.env.MONGO_DB_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error.message);
  }
}

startServer();