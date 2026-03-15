const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  year: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const TeamRegistrationSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, "Please add a team name"],
    unique: true,
    trim: true,
  },
  domain: {
    type: String,
    required: [true, "Please select a domain"],
    enum: [
      "AI / ML",
      "Blockchain",
      "Cybersecurity",
      "Social Innovation",
      "IoT",
    ],
  },
  teamLead: {
    type: MemberSchema,
    required: true,
  },
  teammates: [MemberSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Team", TeamRegistrationSchema);
