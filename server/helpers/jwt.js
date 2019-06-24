const jsonwebtoken = require('jsonwebtoken');
module.exports = class jwt{

    constructor()
    {
        this.mysecret = 'taolatu';
    }
    //this.mysecret = 'taolatu';

    async Encode (data)
    {
        return  await jsonwebtoken.sign(data, 'taolatu');
    }

    async Decode  (data)
    {
        return  jsonwebtoken.verify(data, 'taolatu');
    }

}