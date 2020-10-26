const Koa = require('koa');
const Router = require('koa-router')

const app = new Koa();
const router = new Router()

router.get('/', async ctx => {
    let name = ctx.request.query.name || 'OwO';
    ctx.body = `Hi ${name}`;
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);