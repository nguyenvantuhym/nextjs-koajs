
const next = require('next');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cookie = require('koa-cookie');
const database = require('./server/helpers/database');
const KeyGrip = require("keygrip");

const userRouter = require('./server/routers/user');

const authRouter = require('./server/routers/auth.router');
const getalluserRouter = require('./server/routers/getalluser');



// Initialize KoaJs server and router
const server = new Koa();
const router = new Router();

server.keys = ['im a newer secret', 'i like turtle'];
server.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

//server.use(cookie());
server.use(koaBody());

server.use(userRouter.routes());

server.use(authRouter.routes());
server.use(getalluserRouter.routes());
//
const nextApp = next({ dev: true });
const handler = nextApp.getRequestHandler();
// Initialize NextJs instance and expose request handler


(async () => {
    try {
        await nextApp.prepare();
        router.get('/custom-page', async ctx => {
            await nextApp.render(ctx.req, ctx.res, '/myHandlerComponent', ctx.query);
            ctx.respond = false;
        });

        router.get('*', async ctx => {
            await handler(ctx.req, ctx.res);
            ctx.respond = false;
        });


        server.use(router.routes());
        server.listen(3000, _ => console.log('App running on port 3000'));
    } catch (e) {
        console.error(e);
        process.exit();
    }
})();