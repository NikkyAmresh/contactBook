const { contactModel, companyModel, hapiSchema } = require("../models");
const joi = require("@hapi/joi");
const { contactSchema } = hapiSchema;

const ContactServices = {
  addContact: async (contact, companyId) => {
    let company;

    try {
      company = await companyModel.findById(companyId);
    } catch (error) {
      throw new Error("Company does not exist");
    }

    if (!company) {
      throw new Error("Company does not exist");
    }

    conatact = await contactSchema.validateAsync(contact);
    const contactExists = await contactModel.findOne({
      $or: [
        { emailId: contact.emailId },
        { mobileNumber: contact.mobileNumber },
        { instagramHandle: contact.instagramHandle }
      ]
    });
    if (contactExists) {
      contactExists.companies.push(companyId);
      await contactExists.save();
      return contactExists;
    }
    const newContact = new contactModel({
      ...contact,
      companies: [companyId]
    });
    await newContact.save();
    return newContact;
  },

  addMoreThanOneContact: async (contacts, companyId) => {
    let company;

    try {
      company = await companyModel.findById(companyId);
    } catch (error) {
      throw new Error("Company does not exist");
    }

    if (!company) {
      throw new Error("Company does not exist");
    }

    contacts = joi.array().items(contactSchema).validateAsync(contacts);

    const existingContacts = await contactModel.find({
      $or: [
        { emailId: { $in: contacts.map((c) => c.emailId) } },
        { mobileNumber: { $in: contacts.map((c) => c.mobileNumber) } },
        { instagramHandle: { $in: contacts.map((c) => c.instagramHandle) } }
      ]
    });
    const newContacts = contacts.filter((c) => {
      return !existingContacts.some(
        (ec) =>
          ec.emailId === c.emailId ||
          ec.mobileNumber === c.mobileNumber ||
          ec.instagramHandle === c.instagramHandle
      );
    });
    const contactsToAdd = newContacts.map((c) => {
      return {
        ...c,
        companies: [company._id]
      };
    });
    const addedContacts = await contactModel.insertMany(contactsToAdd);
    const allContacts = [...existingContacts, ...addedContacts];
    for (const contact of allContacts) {
      if (!contact.companies.includes(company._id)) {
        contact.companies.push(company._id);
        await contact.save();
      }
    }
    return allContacts;
  },

  getAllContacts: async (companyId) => {
    let company;

    try {
      company = await companyModel.findById(companyId);
    } catch (error) {
      throw new Error("Company does not exist");
    }

    if (!company) {
      throw new Error("Company does not exist");
    }

    const contacts = await contactModel.find({
      companies: { $in: [companyId] }
    });

    contacts.forEach((contact) => {
      contact.companies = undefined;
    });

    return contacts;
  },

  getContact: async (contact) => {
    if (contact.emailId) {
      return await contactModel
        .findOne({ emailId: contact.emailId })
        .populate("companies");
    }

    if (contact.mobileNumber) {
      return await contactModel
        .findOne({ mobileNumber: contact.mobileNumber })
        .populate("companies");
    }

    if (contact.instagramHandle) {
      return await contactModel
        .findOne({
          instagramHandle: contact.instagramHandle
        })
        .populate("companies");
    }
  },
  updateContact: async (contact) => {
    let contactToUpdate;

    if (contact.emailId) {
      contactToUpdate = await contactModel.findOne({
        emailId: contact.emailId
      });
    }

    if (!contactToUpdate && contact.instagramHandle) {
      contactToUpdate = await contactModel.findOne({
        instagramHandle: contact.instagramHandle
      });
    }

    if (!contactToUpdate && contact.mobileNumber) {
      contactToUpdate = await contactModel.findOne({
        mobileNumber: contact.mobileNumber
      });
    }

    if (!contactToUpdate) {
      throw new Error("Contact does not exist");
    }

    if (contact.name) {
      contactToUpdate.name = contact.name;
    }

    if (contact.address) {
      contactToUpdate.address = contact.address;
    }

    if (contact.emailId) {
      contactToUpdate.emailId = contact.emailId;
    }

    if (contact.mobileNumber) {
      contactToUpdate.mobileNumber = contact.mobileNumber;
    }

    if (contact.instagramHandle) {
      contactToUpdate.instagramHandle = contact.instagramHandle;
    }

    await contactToUpdate.save();

    return contactToUpdate;
  },
  deleteContact: async (contact, companyId) => {
    let contactToDelete;

    if (contact.emailId) {
      contactToDelete = await contactModel.findOne({
        emailId: contact.emailId,
        companies: { $in: [companyId] }
      });
    }

    if (!contactToUpdate && contact.mobileNumber) {
      contactToDelete = await contactModel.findOne({
        mobileNumber: contact.mobileNumber,
        companies: { $in: [companyId] }
      });
    }

    if (!contactToUpdate && contact.instagramHandle) {
      contactToDelete = await contactModel.findOne({
        instagramHandle: contact.instagramHandle,
        companies: { $in: [companyId] }
      });
    }

    if (!contactToDelete) {
      throw new Error("Contact does not exist");
    }
    const index = contactToDelete.companies.indexOf(companyId);
    if (index > -1) {
      contactToDelete.companies.splice(index, 1);
    }

    if (contactToDelete.companies.length === 0) {
      await contactToDelete.remove();
      return contactToDelete;
    }

    await contactToDelete.save();

    return contactToDelete;
  }
};

module.exports = ContactServices;
