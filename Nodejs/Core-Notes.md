## Core Nodejs Notes

### Topics

* ) How it works
* ) Single thread Env
* ) Event Que
* ) Call stack


## Node Packages


* ) Buffer
* ) Child Processes
* ) Cluster
* ) Console
* ) Crypto
* ) Debugger
* ) Errors
* ) Events
* ) File System
* ) Globals
* ) HTTP
* ) HTTP/2
* ) HTTPS
* ) Modules
* ) Net
* ) OS
* ) Path
* ) Process
* ) Query Strings
* ) Stream
* ) URL
* ) ZLIB
* ) Util

### Details

### Buffer

Buffer is for handling binary data

```js

const buf = Buffer.from('hello world', 'ascii');

console.log(buf.toString('hex'));
// Prints: 68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// Prints: aGVsbG8gd29ybGQ=

console.log(Buffer.from('fhqwhgads', 'ascii'));
// Prints: <Buffer 66 68 71 77 68 67 61 64 73>
console.log(Buffer.from('fhqwhgads', 'utf16le'));
// Prints: <Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>

```

### Child process

Please refer child-process.md

### Cluster

A single instance of Node.js runs in a single thread. To take advantage of multi-core systems, the user will sometimes want to launch a cluster of Node.js processes to handle the load.

Communication between worker processes and master happens through IPC (Inter-process communication)

performance and load balancing can easy.


### Crypto

The crypto module provides cryptographic functionality

```js

const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'a password');

let encrypted = '';
cipher.on('readable', () => {
  const data = cipher.read();
  if (data)
    encrypted += data.toString('hex');
});
cipher.on('end', () => {
  console.log(encrypted);
});

cipher.write('some clear text data');
cipher.end();

```

```js

// deciper example

const crypto = require('crypto');
const decipher = crypto.createDecipher('aes192', 'a password');

let decrypted = '';
decipher.on('readable', () => {
  const data = decipher.read();
  if (data)
    decrypted += data.toString('utf8');
});
decipher.on('end', () => {
  console.log(decrypted);
  // Prints: some clear text data
});

const encrypted =
    'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
decipher.write(encrypted, 'hex');
decipher.end();

```

## Debugger

Option 1: Open chrome://inspect in a Chromium-based browser. Click the Configure button and ensure your target host and port are listed.
Option 2: Copy the devtoolsFrontendUrl from the output of /json/list (see above) or the --inspect hint text and paste into Chrome.


## Errors

1) Error-first callbacks
2) new Error

```js

const fs = require('fs');

function errorFirstCallback(err, data) {
  if (err) {
    console.error('There was an error', err);
    return;
  }
  console.log(data);
}

fs.readFile('/some/file/that/does-not-exist', errorFirstCallback);
fs.readFile('/some/file/that/does-exist', errorFirstCallback);

```

```js

const err = new Error('The message');
console.error(err.message);

```

### Types of Errors

AssertionError
RangeError
ReferenceError
SyntaxError
TypeError

Exceptions vs. Errors

A JavaScript exception is a value that is thrown as a result of an invalid operation or as the target of a throw statement. While it is not required that these values are instances of Error or classes which inherit from Error, all exceptions thrown by Node.js or the JavaScript runtime will be instances of Error.

## Events

```js

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.emit('event');

```

## Globals

Class: Buffer
__dirname
__filename
clearImmediate(immediateObject)
clearInterval(intervalObject)
clearTimeout(timeoutObject)
console
exports
global
module
process
require()
setImmediate(callback[, ...args])
setInterval(callback, delay[, ...args])
setTimeout(callback, delay[, ...args])

## setImmediate vs. nextTick

Use setImmediate if you want to queue the function behind whatever I/O event callbacks that are already in the event queue. Use process.nextTick to effectively queue the function at the head of the event queue so that it executes immediately after the current function completes.

```js

var fs = require("fs");
fs.stat("cp.js", function(err, stats){
  if(stats) { console.log("cp.js Exists"); }
});
setImmediate(function(){
  console.log("Immediate Timer 1 Executed");
});
setImmediate(function(){
  console.log("Immediate Timer 2 Executed");
});
process.nextTick(function(){
  console.log("Next Tick 1 Executed");
});
process.nextTick(function(){
  console.log("Next Tick 2 Executed");
});


//output

Next Tick 1 Executed
Next Tick 2 Executed
Immediate Timer 1 Executed
Immediate Timer 2 Executed
nexttick.js Exists

```