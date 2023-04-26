const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: String,
    mobileNumber: String,
    address: String,
    emailId: String,
    instagramHandle: String
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

const Company = mongoose.model("company", schema);

module.exports = Company;
