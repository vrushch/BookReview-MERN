const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.mongodb_uri;
const client = new MongoClient(uri);
const dbName = "prdb";

module.exports = {
  connectToDB: async function () {
    try {
      await client.connect();
      console.log("connected to db");
    } catch (err) {
      console.log("connect error", err);
      res.status(500).send("Internal Server Error");
    }
  },
  addToDB: async function (task, collectionName) {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .insertOne(task);
  },
  readAll: async function (collectionName) {
    const cursor = await client.db(dbName).collection(collectionName).find();
    const data = await cursor.toArray();
    return data;
  },
  readOne: async function (filter, collectionName) {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .findOne(filter);
    return result;
  },
  deleteOne: async function (filter, collectionName) {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .deleteOne(filter);
  },
  updateOne: async function (filter, updateInfo, collectionName) {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .updateOne(filter, updateInfo);
  },
  readAllWithFilter: async function (filter, collectionName) {
    const cursor = await client
      .db(dbName)
      .collection(collectionName)
      .find(filter);
    const data = await cursor.toArray();
    return data;
  },
};
