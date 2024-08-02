const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const Class = require("./models/Class");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Connect to MongoDB driver
mongoose.connect("mongodb://localhost:27017/mydatabase");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

// Fetch all classes
app.get("/classes", async (req, res) => {
  const classes = await Class.find({});
  console.log(classes);
  res.json(classes);
});

// Add a class (for testing purposes)
app.post("/addClass", async (req, res) => {
  const { name, days, startTime, endTime, timezone } = req.body;
  const newClass = new Class({ name, days, startTime, endTime, timezone });
  await newClass.save();
  res.status(201).send("Class added");
});

// Adjust time based on user's location
app.post("/getNextClass", async (req, res) => {
  const { latitude, longitude } = req.body;

  // Get user's timezone using latitude and longitude
  const locationRes = await axios.get(
    `https://timezoneapi.io/api/ip/?${latitude},${longitude}`
  );
  const userTimezone = locationRes.data.data.timezone.id;

  const classes = await Class.find({});

  const adjustedClasses = classes.map((c) => {
    const classTimeInUserTZ = new Date(
      new Date(`2020-01-01T${c.startTime}`).toLocaleString("en-US", {
        timeZone: c.timezone,
      })
    ).toLocaleString("en-US", { timeZone: userTimezone });

    return {
      ...c._doc,
      adjustedStartTime: classTimeInUserTZ,
      userTimezone: userTimezone,
    };
  });

  res.json(adjustedClasses);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
