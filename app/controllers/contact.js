const { contactModel } = require("../models");
const ContactServices = require("../services/contact");

const ContactController = {
  addContact: async (req, res) => {
    const contact = req.body;
    const { companyId } = req.query;
    try {
      const newContact = await ContactServices.addContact(contact, companyId);
      res.status(200).json(newContact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  addMoreThanOneContact: async (req, res) => {
    const { contacts, company } = req.body;
    try {
      const newContacts = await ContactServices.addMoreThanOneContact(
        contacts,
        company
      );
      res.status(200).json(newContacts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getContact: async (req, res) => {
    const { emailId, instagramHandle, mobileNumber, companyId } = req.query;
    if (!emailId && !instagramHandle && !mobileNumber && !companyId) {
      res.status(400).json({ error: "Invalid query params" });
      return;
    }
    try {
      if (companyId) {
        const contacts = await ContactServices.getAllContacts(companyId);
        res.status(200).json(contacts);
        return;
      }

      const contact = await ContactServices.getContact({
        emailId,
        instagramHandle,
        mobileNumber
      });
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateContact: async (req, res) => {
    const contact = req.body;
    try {
      const updatedContact = await ContactServices.updateContact(contact);
      res.status(200).json(updatedContact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ContactController;
