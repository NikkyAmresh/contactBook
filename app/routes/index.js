const companyRoutes = require("./company");
const contactRoutes = require("./contact");
const router = require("express").Router();

module.exports = (app) => {
  router.use("/company", companyRoutes);
  router.use("/contacts", contactRoutes);
  app.use("/api", router);
  app.use((req, res, next) => {
    res.status(404).json({
      message: "Not Found"
    });
  });
};
