const Koa = require('koa');
const Router = require('koa-router')
const logger = require('koa-logger')
const parser = require('koa-bodyparser')
const ObjectID = require("mongodb").ObjectID;

const app = new Koa();
const router = new Router()

require("./mongo/mongo.ts")(app);

app.use(logger());
app.use(parser());
app.use(router.routes()).use(router.allowedMethods());

router.get('/', async (ctx: any) => {
    let name = ctx.request.query.name || 'OwO';
    ctx.body = `Hi ${name}`;
});

router.get('/feed', async (ctx: any) => {
    ctx.body = await ctx.app.feed.find().toArray()
});

router.post('/feed', async (ctx: any) => {
    console.log(ctx.request.body)
    ctx.body = await ctx.app.feed.insertOne(ctx.request.body);
});

router.delete('/feed/:id', async (ctx: any) => {
    let docQuery = {"_id": ObjectID(ctx.params.id)};
    ctx.body = await ctx.app.feed.deleteOne(docQuery);
});


app.listen(3000, async () => {
    console.log('Server started on: ' + 'http://localhost:3000/')
})
.on('error', (err: any) =>{
    console.log(err)
})