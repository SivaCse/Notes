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