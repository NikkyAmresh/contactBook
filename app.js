const express = require("express");
const app = express();
const { dbUrl } = require("./app/config/db.config");

const mongoose = require("mongoose");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

console.log({ dbUrl: dbUrl });

mongoose.Promise = global.Promise;

const connectToDatabase = (callback) => {
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to the database!");
      callback();
    })
    .catch((err) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
};

require("./app/routes/index")(app);

module.exports = { app, connectToDatabase };
