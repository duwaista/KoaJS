const MongoClient = require('mongodb').MongoClient;
const MongoURL = process.env.MONGO_URL;
module.exports = function (app: any) {
    MongoClient.connect(MongoURL, { useUnifiedTopology: true })
        .then((connection: any) => {
            app.feed = connection.db('feed').collection('posted');
        })
        .catch((err: any) => {
            console.log(err)
    })
}