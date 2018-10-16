## Callback Hell Avoid

What is callback hell?

```js

function runSequentially (callback) {
  fastFunction((err, data) => {
    if (err) return callback(err)
    console.log(data)   // results of a
  
    slowFunction((err, data) => {
      if (err) return callback(err)
      console.log(data) // results of b
  
      // here you can continue running more tasks
    })
  })
}

```

Avoid Callback Hell using following ways

1) Use Async module

Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript.

```js

async.waterfall([fastFunction, slowFunction], () => {
  console.log('done')
})

```

2) Using co module

co is a generator based control flow tool for Node.js and the browser, using promises, letting you write non-blocking code in a nice-ish way

```js
const fastPromise = new Promise((resolve, reject) => {
  fastFunction(resolve)
})

const slowPromise = new Promise((resolve, reject) => {
  slowFunction(resolve)
})

co(function * () {
  yield fastPromise
  yield slowPromise
}).then(() => {
  console.log('done')
})

```

3) Use async awit

```js

async function handler () {
  await validateParams()
  const dbResults = await dbQuery()
  const serviceResults = await serviceCall()
  return { dbResults, serviceResults }
})

```

Example 2 

```js

const util = require('util')
const {readFile} = require('fs')

const readFileAsync = util.promisify(readFile)

async function main () {
  const result = await readFileAsync('.gitignore')
  return result
}

main()
  .then(console.log)
  .catch(console.error)

```  