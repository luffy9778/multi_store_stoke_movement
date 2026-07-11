const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.get("/welcome", (req, res) => {
  res.send("Welcome to Api");
});
app.use("/auth", require("./routes/auth.route"));

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message || "Internal Server Error" });
});

module.exports = app;
