# Middleware

Middleware is a function used to execute a function during request and response a webserver.

```js

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

```