const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
const corsOptions = {
  origin: "*", // Replace with your frontend's domain for production (e.g., "https://your-frontend-domain.com")
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Handle Preflight (OPTIONS) Requests
app.options("*", cors(corsOptions));


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const authRoutes = require("../routes/auth");
app.use("/api/auth", authRoutes);

// Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;