const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "mydatabase";

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection("classes");
    // const collections = await db.listCollections().toArray();

    // Print collection names
    // collections.forEach((collection) => {
    //   console.log(collection.name);
    // });

    const deleteResult = await collection.deleteMany({});
    console.log("Deleted documents:", deleteResult.deletedCount);
  } finally {
    await client.close();
  }
}
run();
