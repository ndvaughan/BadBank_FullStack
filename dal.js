const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://ndvaughan1:Z30s1VfqMcEl2c5N@cluster0.2jvys0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let db = null;

// connect to mongo
MongoClient.connect(url, function (err, client) {
    if (err) {
        console.error("Failed to connect to the database:", err);
        return;
    }

    console.log("Connected successfully to db server");
    db = client.db('myproject');
});

// create user account using the collection.insertOne function
async function create(name, email, password) {
    await connectDB();
    const collection = db.collection('users');
    const doc = { name, email, password, balance: 0 };
    return collection.insertOne(doc);
}

// find user account 
async function find(email) {
    await connectDB();
    return db.collection('users').find({ email: email }).toArray();
}

// find user account
async function findOne(email) {
    await connectDB();
    return db.collection('users').findOne({ email: email });
}

// update - deposit/withdraw amount
async function update(email, amount) {
    await connectDB();
    return db.collection('users').findOneAndUpdate(
        { email: email },
        { $inc: { balance: amount } },
        { returnOriginal: false }
    );
}

// return all users by using the collection.find method
async function all() {
    await connectDB();
    return db.collection('users').find({}).toArray();
}

async function connectDB() {
    if (db === null) {
        throw new Error("Database connection has not been established yet.");
    }
}

module.exports = { create, findOne, find, update, all };
