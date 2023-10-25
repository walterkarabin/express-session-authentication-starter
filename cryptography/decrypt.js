const crypto = require('crypto');

function decryptWithPrivateKey(privateKey, encryptedMessage){
    const bufferMessage = Buffer.from(encryptedMessage, 'base64');

    return crypto.privateDecrypt(privateKey, bufferMessage);
}

function decryptWithPublicKey(publicKey, encryptedMessage){
    const bufferMessage = Buffer.from(encryptedMessage, 'base64');

    return crypto.publicDecrypt(publicKey, bufferMessage);
}

module.exports.decryptWithPrivateKey = decryptWithPrivateKey;
module.exports.decryptWithPublicKey = decryptWithPublicKey;