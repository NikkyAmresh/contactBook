require("dotenv").config();
module.exports = {
  dbUrl:
    process.env.NODE_ENV === "production"
      ? process.env.PROD_DB
      : process.env.DEV_DB
};
