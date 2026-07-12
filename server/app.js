const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/welcome", (req, res) => {
  res.send("Welcome to Api");
});
app.use("/auth", require("./routes/auth.route"));
app.use("/product", require("./routes/product.route"));
app.use("/store", require("./routes/store.route"));
app.use("/stock", require("./routes/stock.route"));

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message || "Internal Server Error" });
});

module.exports = app;
