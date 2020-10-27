const MongoClient = require('mongodb').MongoClient;
const Mongo_URL = "YOUR_MONGODB_URL"

module.exports = function (app: any) {
    MongoClient.connect(Mongo_URL, { useUnifiedTopology: true })
        .then((connection: any) => {
            app.feed = connection.db('feed').collection('posted');
        })
        .catch((err: any) => {
            console.log(err)
    })
}