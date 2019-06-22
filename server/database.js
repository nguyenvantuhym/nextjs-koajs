const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');


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
    async login(dataAccount)
    {
        let {username} = dataAccount;
        let accountExist = await User.findOne({username});
        console.log(accountExist);
        if(accountExist)
        {
            let compa = await bcrypt.compare(dataAccount.password, accountExist.password);
            if(compa === true) 
            {
                return ({
                    success:true,
                    message:"dang nhap thanh cong",
                    data:{
                        roles:"boss"
                    }
                })
            }
            else{
                return ({
                    success:false,
                    message:"dang nhap khong thanh cong"
                })
            }
        }


        
    }


    async newAccount(dataNewAccount)
    {

        let {username} = dataNewAccount;
        let accountExist = await User.findOne({username});
        if(accountExist)
        {
            console.log('error username exist');
            return({
                success:false,
                message:"tai khoan da ton tai"
            });// dinh nghia object {success :bool, data: object, message :string}

        }

        let result={};

        let hash = await bcrypt.hash(dataNewAccount.password, saltRounds);

        if(hash) {
            let newUser = User({...dataNewAccount, password:hash});
                
            newUser.save();
            result = { 
            success:true,
            data:newUser._id
            };
            //return result;
            console.log(result);
            return result;
        }
        
    }

}

module.exports = new Database();