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
});

router.post('/api/feed', async (ctx) => {
    ctx.body = await ctx.app.feed.insertOne(ctx.request.body);
});

router.delete('/api/feed/:id', async (ctx) => {
    let docQuery = {"_id": ObjectID(ctx.params.id)};
    ctx.body = await ctx.app.feed.deleteOne(docQuery);
});

router.get('/api/user', async (ctx) => {
    ctx.body = await ctx.app.user.find().toArray();
});

router.get('/api/user/:id', async (ctx) => {
    ctx.body = await ctx.app.user.findOne({"uid": ctx.params.id.toString()});
});

router.post('/api/user/', async (ctx) => {
    ctx.body = await ctx.app.user.insertOne(ctx.request.body);
});

app.listen(process.env.PORT || 5000, async () => {
    console.log('Server started on: ' + 'http://localhost:5000/')
})
.on('error', (err) =>{
    console.log(err);
});