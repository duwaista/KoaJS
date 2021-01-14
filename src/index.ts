const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const parser = require('koa-bodyparser');
const ObjectID = require("mongodb").ObjectID;

const app = new Koa();
const router = new Router();

require("./mongo/mongo.ts")(app);

app.use(logger());
app.use(parser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

router.get('/', async (ctx: any) => {
    let name = ctx.request.query.name || 'user';
    ctx.body = `Hi ${name}`;
});

router.get('/api/feed', async (ctx: any) => {
    ctx.body = await ctx.app.feed.find().toArray()
});

router.post('/api/feed', async (ctx: any) => {
    console.log(ctx.request.body)
    ctx.body = await ctx.app.feed.insertOne(ctx.request.body);
});

router.delete('/api/feed/:id', async (ctx: any) => {
    let docQuery = {"_id": ObjectID(ctx.params.id)};
    ctx.body = await ctx.app.feed.deleteOne(docQuery);
});


app.listen(5000, async () => {
    console.log('Server started on: ' + 'http://localhost:5000/')
})
.on('error', (err: any) =>{
    console.log(err)
})