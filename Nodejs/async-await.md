### Consuming Async Fn from axios

```js

const axios = require('axios')
const getAzatsWebsite = async () => {
  const response = await axios.get('http://azat.co')
  return response.data
}
getAzatsWebsite().then(console.log)

```

### util.promisify

```js

const fs = require('fs')
const util = require('util')
const f = async function () {
  try {
    const data = await util.promisify(fs.readFile)('os.js', 'utf8') // <- try changing to non existent file to trigger an error
    console.log(data)
  } catch (e) {
    console.log('ooops')
    console.error(e)
    process.exit(1)
  }
}

f()
console.log('could be doing something else')

```

### Consuming Async Fn from mocha and axios (Cont)

```js

describe('express rest api server', async () => {
  let id

  it('posts an object', async () => {
    const {data: body} = await axios
      .post(`http://localhost:${port}/collections/test`, 
      { name: 'John', email: 'john@rpjs.co'})
    expect(body.length).to.eql(1)
    expect(body[0]._id.length).to.eql(24)
    id = body[0]._id
  })

  it('retrieves an object', async () => {
    const {data: body} = await axios
      .get(`http://localhost:${port}/collections/test/${id}`)
    expect(typeof body).to.eql('object')
    expect(body._id.length).to.eql(24)
    expect(body._id).to.eql(id)
    expect(body.name).to.eql('John')
  })
  // ...
})


```