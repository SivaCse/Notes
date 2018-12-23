### Axios with Error Handle

```js

const axios = require('axios')
axios.get('https://azat.co') // https will cause an error!
  .then((response)=>response.data)
  .then(html => console.log(html))
  .catch(e=>console.error(e))

```

### Promise Example

```js

const fs = require('fs')
function readJSON(filename, enc='utf8'){
  return new Promise(function (resolve, reject){
    fs.readFile(filename, enc, function (err, res){
      if (err) reject(err)
      else {
        try {
          resolve(JSON.parse(res))
        } catch (ex) {
          reject(ex)
        }
      }
    })
  })
}

readJSON('./package.json').then(console.log)

```