const { MongoClient } = require("mongodb");

let database;

const initDb = async () => {
  if (database) {
    return database;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing.");
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();

  database = client.db("recipeDB");

  console.log("Connected to recipeDB");

  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};