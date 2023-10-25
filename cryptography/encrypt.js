const crypto = require('crypto');

// Used for Confidentiality
function encryptWithPublicKey(publicKey, message){
    const bufferMessage = Buffer.from(message, 'utf8');

    return crypto.publicEncrypt(publicKey, bufferMessage);
}

// Used for Identity Verification
function encryptWithPrivateKey(privateKey, message){
    const bufferMessage = Buffer.from(message, 'utf8');

    return crypto.privateEncrypt(privateKey, bufferMessage);
}

module.exports.encryptWithPublicKey = encryptWithPublicKey;
module.exports.encryptWithPrivateKey = encryptWithPrivateKey;