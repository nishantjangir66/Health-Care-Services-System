const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://localhost:27017/health_system");

const healthRoute = require("./routes/healthRoute");
app.use("/", healthRoute);
const port = process.env.SERVER_PORT | 2000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
