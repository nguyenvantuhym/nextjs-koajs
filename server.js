
const next = require('next');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const database = require('./server/database');



// Initialize KoaJs server and router
const server = new Koa();
const router = new Router();



server.use(koaBody());

// Initialize NextJs instance and expose request handler
const nextApp = next({ dev: true });
const handler = nextApp.getRequestHandler();

(async () => {
    try {
        await nextApp.prepare();
        router.get('/custom-page', async ctx => {
            await nextApp.render(ctx.req, ctx.res, '/myHandlerComponent', ctx.query);
            ctx.respond = false;
        });

        router.post('/signup',async ctx=>{
            let dataSignup = ctx.request.body;
            //console.log(dataSignup);
            let result = await database.newAccount(dataSignup);
            ctx.body = result;
            
        });

        router.post('/signin',async ctx=>{
            let dataSignup = ctx.request.body;
            //console.log(dataSignup);
            let result = await database.login(dataSignup);
            ctx.body = result;
            
        });
        
        router.post('/postdata', async ctx=>{
            ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
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