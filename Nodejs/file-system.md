# File System Module (fs)

## Types

1) Asynchronous API


    ```js

    const fs = require('fs')

    fs.unlink('/tmp/hello', (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('successfully deleted /tmp/hello')
    })

    ```

2) Synchronous API

    ```js

    const fs = require('fs')

    try {
    fs.unlinkSync('/tmp/hello')
    } catch (ex) {
    console.log(ex)
    }

    console.log('successfully deleted /tmp/hello');

    ```

### Reading file 

```js

var fs = require('fs');
fs.readFile('data.txt', function (err, data) {
  if (err)
    throw err;
  if (data)
    console.log(data.toString('utf8'));
});

```

### writing a file

```js

var fs = require('fs');
fs.writeFile('data2.txt', 'Hello, World!', function (err) {
     if (err)
       throw err;
});

```

### Copying a file

```js

const fs = require('fs')
const readableStream = fs.createReadStream('original.txt')
var writableStream = fs.createWriteStream('copy.txt')

readableStream.pipe(writableStream)

```

### fs.access - used to check permission

```js

fs.access('/etc/passwd', fs.constants.R_OK | fs.constants.W_OK, (err) => {
  if (err) {
    return console.error('no access')
  }
  console.log('access for read/write')
})

```

### fs.watch - used to listen file/directory changes

### fs.exists - used to check whether file exists or not

### fs.stat - used to get file related informations

### file system with async/await

```js

import fs from 'fs';
import {promisify} from 'util';

const readdir = promisify(fs.readdir);

async function myF() {
  let names;
  try {
    {err, names} = await readdir('data.txt');
    if (err) {
        // Handle  error.
    }
  } catch (error) {
    console.log('error occured', error);
  }
  // Handle data here
}

myF();

```