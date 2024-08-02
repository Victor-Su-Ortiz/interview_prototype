const { MongoClient } = require("mongodb");
const Class = require("./models/Class");
const { default: mongoose } = require("mongoose");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "mydatabase";

mongoose.connect("mongodb://localhost:27017/mydatabase");

async function run() {
  // try {
  //   // Connect to the MongoDB server
  //   await client.connect();
  //   console.log("Connected successfully to server");
  //   // Select the database
  //   const db = client.db(dbName);
  //   // Select the collection
  //   const collection = db.collection("myCollection");
  //   // Insert a single document
  //   const insertResult = await collection.insertOne({
  //     name: "John Doe",
  //     age: 30,
  //     city: "New York",
  //   });
  //   console.log("Inserted document:", insertResult.insertedId);
  //   // Insert multiple documents
  //   const insertManyResult = await collection.insertMany([
  //     {
  //       name: "English",
  //       days: ["Monday"],
  //       startTime: "1:00pm",
  //       endTime: "2:00pm",
  //       timezone: "America/New_York",
  //     },
  //   ]);
  //   console.log("Inserted documents:", insertManyResult.insertedIds);
  // } finally {
  //   // Close the connection
  //   await client.close();
  // }

  // const newClass = new Class({
  //   name: "Math 101",
  //   days: ["Monday", "Wednesday", "Friday"],
  //   startTime: "09:00",
  //   endTime: "10:30",
  //   timezone: "America/New_York",
  // });
  const classes = [
    {
      name: "Math 101",
      days: ["Monday", "Wednesday", "Friday"],
      startTime: "09:00",
      endTime: "10:30",
      timezone: "America/New_York",
    },
    {
      name: "Physics 201",
      days: ["Tuesday", "Thursday"],
      startTime: "11:00",
      endTime: "12:30",
      timezone: "America/Los_Angeles",
    },
    {
      name: "Chemistry 301",
      days: ["Monday", "Wednesday"],
      startTime: "14:00",
      endTime: "15:30",
      timezone: "America/Chicago",
    },
  ];

  try {
    // Use insertMany to save all classes at once
    const savedClasses = await Class.insertMany(classes);
    console.log("Classes saved successfully:", savedClasses);
  } catch (err) {
    console.error("Error saving classes:", err);
  } finally {
    await mongoose.connection.close();
  }
}

run().catch(console.dir);
