const companyController = require("../controllers/company");
const router = require("express").Router();

router.get("/", companyController.getAllCompanies);
router.post("/", companyController.addCompany);

module.exports = router;
