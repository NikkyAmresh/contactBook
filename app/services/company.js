const { companyModel, hapiSchema } = require("../models");
const { companySchema } = hapiSchema;

const CompanyServices = {
  addCompany: async (company) => {
    company = await companySchema.validateAsync(company);
    const companyExists = await companyModel.findOne({
      $or: [
        { emailId: company.emailId },
        { mobileNumber: company.mobileNumber },
        { instagramHandle: company.instagramHandle }
      ]
    });
    if (companyExists) {
      throw new Error("Company already exists");
    }
    const newCompany = new companyModel(company);
    await newCompany.save();
    return newCompany;
  },
  getAllCompanies: async () => {
    const companies = await companyModel.find();
    return companies;
  }
};

module.exports = CompanyServices;
