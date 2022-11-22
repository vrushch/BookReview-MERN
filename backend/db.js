const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.mongodb_uri;
const client = new MongoClient(uri);
const dbName = "prdb";
const collectionName = "books";

module.exports = {
    connectToDB: async function () {
        try {
            await client.connect();
            console.log("connected to db");
        }
        catch (err) {
            console.log("connect error", err);
            res.redirect("/500.html");
        }
    },
    addToDB: async function (task) {
        const result = await client.db(dbName).collection(collectionName).insertOne(task);
    },
    readAll: async function () {
        const cursor = await client.db(dbName).collection(collectionName).find();
        const data = await cursor.toArray();
        return data;
    },
    readOne: async function (filter) {
        const result = await client.db(dbName).collection(collectionName).findOne(filter);
        return result;
    }
}