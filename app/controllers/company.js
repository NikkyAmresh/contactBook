const { companyModel } = require("../models");
const CompanyServices = require("../services/company");

const CompanyController = {
  addCompany: async (req, res) => {
    const company = req.body;
    try {
      const newCompany = await CompanyServices.addCompany(company);
      res.status(200).json(newCompany);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllCompanies: async (req, res) => {
    try {
      const companies = await CompanyServices.getAllCompanies();
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = CompanyController;
