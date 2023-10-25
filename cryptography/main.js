const crypto = require('crypto');
const fs = require('fs');

const encryptWithPublicKey = require('./encrypt').encryptWithPublicKey;

const decryptWithPrivateKey = require('./decrypt').decryptWithPrivateKey;

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

const encryptedMessage = encryptWithPublicKey(publicKey, 'secret message');

console.log(encryptedMessage.toString('base64'));

console.log('------------------------------------');

const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage);

console.log(decryptedMessage.toString());