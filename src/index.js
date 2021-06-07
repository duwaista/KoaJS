const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const parser = require('koa-bodyparser');
const ObjectID = require("mongodb").ObjectID;
require('dotenv').config();

const app = new Koa();
const router = new Router();

require("./mongo/mongo")(app);

app.use(logger());
app.use(parser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

router.get('/api/feed', async (ctx) => {
    ctx.body = await ctx.app.feed.find().toArray();
    ctx.response.status = 200;
    console.log(ctx.request);
});

router.post('/api/feed', async (ctx) => {
    ctx.body = await ctx.app.feed.insertOne(ctx.request.body);
    ctx.response.status = 200;
    console.log(ctx.response.body.insertedId);
});

router.delete('/api/feed/:id', async (ctx) => {
    let docQuery = {"_id": ObjectID(ctx.params.id)};
    ctx.body = await ctx.app.feed.deleteOne(docQuery);
});

app.listen(process.env.PORT || 5000, async () => {
    console.log('Server started on: ' + 'http://localhost:5000/')
})
.on('error', (err) =>{
    console.log(err);
})