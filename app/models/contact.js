const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    mobileNumber: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    emailId: {
      type: String
    },
    instagramHandle: {
      type: String
    },
    companies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Contact = mongoose.model("contact", schema);
module.exports = Contact;
