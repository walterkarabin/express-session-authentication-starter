const crypto = require('crypto');
const fs = require('fs');
const decrypt = require('./decrypt');

const receivedData = require('./signMessage').packageOfDataToSend;

const senderPublicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

const hash = crypto.createHash(receivedData.algorithm);

const decryptedMessage = decrypt.decryptWithPublicKey(senderPublicKey, receivedData.signedAndEncryptedData);
const decryptedMessageHex = decryptedMessage.toString();
console.log('Here is the decrypted message:');
console.log(decryptedMessageHex);
console.log('------------------------------------');

const hashOfOriginal = hash.update(JSON.stringify(receivedData.originalData));
const hashOfOriginalHex = hash.digest('hex');

console.log('Here is the hash of original message:');
console.log(hashOfOriginalHex);
console.log('------------------------------------');

if (decryptedMessageHex === hashOfOriginalHex) {
    console.log('Success! Data was not tampered with and the sender is valid.');
} else {
    console.log('Failed! Data was tampered with or the sender is not valid.');
}