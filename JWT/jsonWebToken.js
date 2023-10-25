const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync(__dirname+'/priv_key.pem', 'utf8');
const publicKey = fs.readFileSync(__dirname+'/pub_key.pem', 'utf8');

const payloadObj = {
    sub:'1234567890',
    name:'John Doe',
    admin:true,
    iat:1516239022
}

const signedJWT = jwt.sign(payloadObj, privateKey, { algorithm:'RS256' });

console.log('Signed JWT: ' + signedJWT);

jwt.verify(signedJWT, publicKey, {algorithms:['RS256']}, (err, payload)=>{
    if(err){
        console.log('Error: ' + err);
    }else{
        console.log('Payload: ' + JSON.stringify(payload));
        console.log(payload);
    }
});