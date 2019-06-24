const jwt = require("./jwt");

module.exports = async (ctx,next)=>
{

    token = ctx.cookies.get("token");
    console.log(token);
    if(token !== null&& token !== '')
    {
        const jwtBody = await jwt.Decode(token);
        console.log(jwtBody);
        ctx.body = "hello";

        if(jwtBody.username)
        {
            ctx.state = {
                success :true,
                rules: "boss",
                username: jwtBody.username
            };
            await next();
        }
        else{
            ctx.state={
                success:false,
            };
            return;
        }
       
    }
    
    
}