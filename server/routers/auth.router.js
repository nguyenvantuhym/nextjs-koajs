const auth = require('./../helpers/auth');
const gennerateToken = require('./../helpers/generateToken');

const Router = require('koa-router');


const router = new Router();

router.get('/auth',auth, async (ctx)=>{
    ctx.body = ctx.state;

});



module.exports = router;