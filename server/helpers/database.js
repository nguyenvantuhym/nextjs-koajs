const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./../models/user');


const saltRounds = 10;

class Database {
    constructor()
    {
        this._connect();
        //console.log("hello");
        //this.newAccount();

    }

    async _connect()
    {
        const URL = `mongodb+srv://admin:admin@cluster0-kwozd.mongodb.net/training?retryWrites=true&w=majority`; 
        await  mongoose.connect(URL,{ useNewUrlParser: true })
        .then((err,client)=>{
                
                console.log('Database connection successful');
            })
        .catch((err)=>console.log('Database connection error!!' + err));

    }
    async login(ctx,next)
    {
        let dataSignin = ctx.request.body;
        let {username} = dataSignin;
        let accountExist = await User.findOne({username});
        console.log(accountExist);
        if(accountExist)
        {
            let compa = await bcrypt.compare(dataSignin.password, accountExist.password);
            if(compa === true) 
            {
               // await next();
                ctx.body = {
                    success:true,
                    message:"dang nhap thanh cong",
                    data:{
                        roles:"boss"
                    }
                };
            }
            else{
                ctx.body = {
                    success:false,
                    message:"dang nhap khong thanh cong"
                };
            }
        }
        else
        {
            ctx.body = {
                success:false,
                message:"dang nhap khong thanh cong"
            };
        }


        
    }


    async newAccount(ctx,next)
    {
        let dataSignup = ctx.request.body;
        let {username} = dataSignup;
        let accountExist = await User.findOne({username});
        if(accountExist)
        {
            console.log('error username exist');
            ctx.body ={
                success:false,
                message:"tai khoan da ton tai"
            };// dinh nghia object {success :bool, data: object, message :string}

        }

        

        let hash = await bcrypt.hash(dataSignup.password, saltRounds);

        if(hash) {
            let newUser = User({...dataSignup, password:hash});
                
            newUser.save();
            ctx.state.user =newUser;
            await next();
            /*ctx.body = { 
                success:true,
                data:newUser._id
            };*/
            
            
        }
        
    }

}

module.exports = new Database();