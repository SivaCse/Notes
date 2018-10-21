# Encryption

Nodejs offers great support for cryptography. crypto module is used to encryption and decryption. one of the most used algorithm is AES 256.
AES is a symmetric-key algorithm, meaning the same key is used for both encrypting and decrypting the data. It is one of the most popular and widely used encryption algorithms. There are three variants (block sizes) of AES: 128, 192, and 256.

Example 1

```js

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
 
var hw = encrypt("hello world")
// outputs hello world
console.log(decrypt(hw));

```

Here,

AES-256 is algorithm 
ctr is the mode
createCipher is the fn used to encrypt
createDecipher is the fn used to decrypt

## Encryption and Decryption with Streams

```js

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

var fs = require('fs');
var zlib = require('zlib');

// input file
var r = fs.createReadStream('file.txt');
// zip content
var zip = zlib.createGzip();
// encrypt content
var encrypt = crypto.createCipher(algorithm, password);
// decrypt content
var decrypt = crypto.createDecipher(algorithm, password);
// unzip content
var unzip = zlib.createGunzip();
// write file
var w = fs.createWriteStream('file.out.txt');

// start pipe
r.pipe(zip).pipe(encrypt).pipe(decrypt).pipe(unzip).pipe(w);

```