const Joi = require("@hapi/joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  mobileNumber: Joi.string(),
  address: Joi.string().required(),
  emailId: Joi.string(),
  instagramHandle: Joi.string()
}).or("mobileNumber", "emailId", "instagramHandle");

const companySchema = Joi.object({
  name: Joi.string().required(),
  mobileNumber: Joi.string().required(),
  address: Joi.string().required(),
  emailId: Joi.string().required(),
  instagramHandle: Joi.string().required()
});

module.exports = { contactSchema, companySchema };
