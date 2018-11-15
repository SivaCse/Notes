```js

function log(req, res, next) {
  console.log('Logging...'); 
  next();
}

module.exports = log;

```

// inside app.js

...

app.use(logger);

...