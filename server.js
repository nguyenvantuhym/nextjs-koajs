
const next = require('next');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cookie = require('koa-cookie');
const database = require('./server/helpers/database');
const KeyGrip = require("keygrip");

const signinRouter = require('./server/routers/signin');
const signupRouter = require('./server/routers/signup');



// Initialize KoaJs server and router
const server = new Koa();
const router = new Router();

server.keys = ['im a newer secret', 'i like turtle'];
server.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

//server.use(cookie());
server.use(koaBody());

server.use(signinRouter.routes());
server.use(signupRouter.routes());
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

       /* router.post('/signup',async ctx=>{
            let dataSignup = ctx.request.body;
            //console.log(dataSignup);
            let result = await database.newAccount(dataSignup);
            ctx.body = result;
            
        });*/
        /*
        router.post('/signin',async ctx=>{
            let dataSignup = ctx.request.body;
            //console.log(dataSignup);
            let result = await database.login(dataSignup);
            
            ctx.body = result;
            
        });
        
        router.post('/postdata', async ctx=>{
            ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
        });
        */
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