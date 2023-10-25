const crypto = require('crypto');
const fs = require('fs');
const hash = crypto.createHash('sha256');

const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const myData = {
    firstName: 'John',
    lastName: 'Doe',
    socialSecurityNumber: '555-55-5555'
};

const myDataStringified = JSON.stringify(myData);

hash.update(myDataStringified);

const hashedData = hash.digest('hex');

const senderPrivateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);

// console.log(signedMessage.toString('base64'));

const packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: myData,
    signedAndEncryptedData: signedMessage
};

module.exports.packageOfDataToSend = packageOfDataToSend;