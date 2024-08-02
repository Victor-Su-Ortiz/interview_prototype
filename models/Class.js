const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: String,
  days: [String],
  startTime: String,
  endTime: String,
  timezone: String, // Store the timezone of the class
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
