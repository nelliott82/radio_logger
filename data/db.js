var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/radiologger";

MongoClient.connect("mongodb://localhost:27017/radiologger", { useNewUrlParser: true });
