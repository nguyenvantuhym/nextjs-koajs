const jsonwebtoken = require('jsonwebtoken');
 class jwt{

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
        return  await jsonwebtoken.verify(data, 'taolatu');
    }

}
module.exports = new jwt();