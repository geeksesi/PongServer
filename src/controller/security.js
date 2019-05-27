const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const KEY = '032b71bd99d3987fd2c283bb89d0271926be762fb5043b38';
const IV = '39f27edf383ac652f7a5491de2b3e5de';

function encrypt(array, cb) {
    let text = JSON.stringify(array);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(KEY, 'hex'), Buffer.from(IV, 'hex'));
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    cb(encrypted);
}

function decrypt(text,cb) {
    // console.log(text);
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(KEY, 'hex'), Buffer.from(IV, 'hex'));
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');

    array = JSON.parse(dec);
    cb(array);
}

module.exports = 
{
    encrypt,
    decrypt
}