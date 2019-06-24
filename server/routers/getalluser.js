const auth = require('./../helpers/auth');
const gennerateToken = require('./../helpers/generateToken');
const database = require('./../helpers/database');

const Router = require('koa-router');


const router = new Router();

router.get('/api/getalluser',auth, async (ctx,next)=>{
    if(ctx.state.success ===true){
        await next();
        if(ctx.state.data)
        {
            console.log(ctx.state.data);
            ctx.body = {
                success:true,
                data:ctx.state.data
            };
            return;
        }
        else{
            ctx.body = {
                success:false
            };
        }
       
    }
   
    ctx.body = {
            success:false,
        }
    

},database.getalluser);



module.exports = router;