const MongoClient = require('mongodb').MongoClient;
const MongoURL = process.env.MONGO_URL;

module.exports = function (app) {
    MongoClient.connect(MongoURL, { useUnifiedTopology: true })
        .then((connection) => {
            app.feed = connection.db('feed').collection('posted');
        })
        .catch((err) => {
            console.log(err);
    })
}