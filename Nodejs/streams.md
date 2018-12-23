# Streams

Collection of data or large data which is not fit into memory at once is 
refered as streams

## Stream is Used In:

HTTP request & responses
Standard input/output(stdin & stdout)
File reads and write

## Types

Read Streams
Write Streams
Duplex Streams

Example

### Types of Streams

Readable, e.g., fs.createReadStream
Writable, e.g., fs.createWriteStream
Duplex, e.g., net.Socket
Transform, e.g., zlib.createGzip

```js

const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  const src = fs.createReadStream(<file to read>);
  src.pipe(res);
});

server.listen(8000);

```

```js
// Read stream exmple

const fs = require('fs');

const src = fs.createReadStream('./big.file');

src.on('data',(data)=>{
console.log(data.toString())
})

src.on('end',()=>{
console.log('Complete')
})


```

### Reading data through async Example

```js

async function myRead(filePath) {
  const chunks = fs.createReadStream(filePath,{ encoding: 'utf8'});

  for await (const chunk of chunks) {
    console.log(chunk);
  }
  console.log('Read Complete');
}

```

## Stream Events

### Readable

    *) data - will emit chunk data 
    *) end  - will emit once chunk data is finished
    *) error - will emit if any errors occured during reading
    *) close - 
    *) readable

### Writable

    *) drain - will emit when writable stream ready to receive data 
    *) finish - will emit when all data are emitted
    *) error
    *) close
    *) pipe/unpipe


### pipe()

This function is used to pair readable to writable.

```js

src.pipe(some).pipe(some2).pipe(dst)

```
### duplex stream 

```js

a.pipe(b).pipe(a)

```

### Built in Streams

*) process.stdin
*) process.stdout
*) process.stderr

## Another Example

```js

const fs = require('fs')
const crypto = require('crypto')
const zlib = require('zlib')
const SECRET = '3AABD889-25F9-4339-AAC2-3BE8EF02B047'

const r = fs.createReadStream('file.txt')
const e = crypto.createCipher('aes256', SECRET)
const z = zlib.createGzip()
const w = fs.createWriteStream('file.txt.gz')
r.pipe(e).pipe(z).pipe(w)

```

### Pipe and Transform

Encrypts and Zips:

```js

const r = fs.createReadStream('file.txt')
const e = crypto.createCipher('aes256', SECRET) 
const z = zlib.createGzip()
const w = fs.createWriteStream('file.txt.gz')
r.pipe(e).pipe(z).pipe(w)

```

### With pipe, we can listen to events 

```js

const r = fs.createReadStream('file.txt')
const e = crypto.createCipher('aes256', SECRET) 
const z = zlib.createGzip()
const w = fs.createWriteStream('file.txt.gz')
r.pipe(e)
  .pipe(z).on('data', () => process.stdout.write('.') // progress dot "."
  .pipe(w).on('finish', () => console.log('all is done!')) // when all is done

```

### Core http uses Streams

```js

const http = require('http')
var server = http.createServer( (req, res) => {
  req.setEncoding('utf8')
  req.on('data', (chunk) => { // readable
    processDataChunk(chunk) // This functions is defined somewhere else
  })
  req.on('end', () => {  
    res.write('ok') // writable
    res.end()
  })
})

server.listen(3000)

```

### Stream large file

```js

const path = require('path')
const fileName = path.join(
  __dirname, process.argv[2] || 'webapp.log') // 67Mb
const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
  if (req.url === '/callback') {
    fs.readFile(fileName, (err, data) => {
      if (err) return console.error(err)
      res.end(data)
    })
  } else if (req.url === '/stream') {
    const src = fs.createReadStream(fileName)
    src.pipe(res)
  }
})

server.listen(3000)

```