// Import dependencies
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const TelebirrRoute = require("./routes/telebirr/TelebirrRoute");
dotenv.config({
  path: "./configs/config.env",
});
const app = express();
app.use(express.json());
const port = process.env.PORT || 5001;
app.use(express.json());
//exporting routes

app.use("/API/v1.0.0/telebirr", TelebirrRoute);
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  async (err) => {
    if (err) {
      throw err;
    } else {
      console.log("successfully connected to DB");
    }
  }
);
//setting Routes End points

const server = app.listen(port, () =>
  console.log(`Backend server port: ${port}`)
);
