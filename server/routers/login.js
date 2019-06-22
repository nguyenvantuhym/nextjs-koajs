const router = require('koa-router');

router.post('/signin',async ctx=>{
    let dataSignup = ctx.request.body;
    //console.log(dataSignup);
    let result = await database.login(dataSignup);
    ctx.body = result;
    
});
module.exports = router;