const base64url = require('base64url');
const crypto = require('crypto');
const fs = require('fs');
const signatureFunction = crypto.createSign('RSA-SHA256');
const verifyFunction = crypto.createVerify('RSA-SHA256');

/**
 * HERE IS THE ISSUANCE
 */

const headerObj = {
    alg:'RS256',
    typ:'JWT'
}

const payloadObj = {
    sub:'1234567890',
    name:'John Doe',
    admin:true,
    iat:1516239022
}

const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

const headerBase64Url = base64url(headerObjString);
const payloadBase64Url = base64url(payloadObjString);

// Create the signature
signatureFunction.write(headerBase64Url + '.' + payloadBase64Url);
signatureFunction.end();

const privateKey = fs.readFileSync(__dirname+'/priv_key.pem', 'utf8');
const signatureBase64 = signatureFunction.sign(privateKey, 'base64');

// convert to base64url, from base64
const signatureBase64Url = base64url.fromBase64(signatureBase64);

console.log('Here is the signature: ');
console.log(signatureBase64Url);

/**
 * END OF ISSUANCE
*/ 

/**
 * VERIFICATION
 */
const JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.w73vC4ATTWZtrnJGRxjekqwfB6qtPcclfM1yoZy9gzhK1UQ-yEb_aJqNOWE0UdiVwj0B0zKaB5NY8PfFtXO1QXInWygD90Nfs2yLUlZQ5zmwC3831xZKF0IJvUvpedKPp9ZxzB5VsCUeQziM74sdJ1Rkrh38WKf321mmVjxY9IhrL2coT8fGOVddl42CAIUpGNEk8ooV9_UE6t_OhcCVL4V_6oQM7w_FlhfWLRGNv99S_9di_QhG2XzmgBjz2q-v6FkU9258DMkmMRDlKmCX-9cunTq-pwGRyFwQuL-K5ML9jbO4YupcvBcFQzMXR32QXuX6xT2geCgtTnSNin8DjkUe_mmxr8mM4RWMjcvnGdtK8m4d1BtojnRU3Z0zulCToKXg6WAvO2jGHnuAVL_mXmgP0kGU4ZBi1Cyeev5S_qbGPMr99athn5GfOudK8xLq4bSjWIzvkfWQZyZu_o6u3hFOvkY-DTNo-63zZ7hEv_k0OV1ABvaUcsQBFxwZulNNxvxZu5Pa2WPPukp0bSfGV0N-RPtCScrGaR7-BVVexDRq3NS7SuSVdJJEt2rYBreNXIOjNiaEcKBNlU7m7KzEZBFJVleAHd28Thcq6y-xuKeqWUQhq4qGER1OSBZnIIe-O8rML_aCYJIJxObAPt0MMiZUYkXD_NxEc-s5G1xv1rM';

const [headerInBase64UrlFormat, payloadInBase64UrlFormat, signatureInBase64UrlFormat] = JWT.split('.');

verifyFunction.write(headerBase64Url + '.' + payloadBase64Url);
verifyFunction.end();

const jwtSignatureBase64 = base64url.toBase64(signatureInBase64UrlFormat);

const publicKey = fs.readFileSync(__dirname+'/pub_key.pem', 'utf8');

const signatureIsValid = verifyFunction.verify(publicKey, jwtSignatureBase64, 'base64');

console.log('Is the signature valid?');
console.log(signatureIsValid);

/**
 * END OF VERIFICATION
 */