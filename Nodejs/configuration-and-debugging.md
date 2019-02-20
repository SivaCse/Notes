```js

const debug = require('debug')('app:startup');
const config = require('config');
...


// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

...

```

// export DEBUG=app:startup

// node app.js

// for configuration create following json files inside config folder

custom-environment-variables
development
default
production

// export NODE_ENV = development

for secret data,
custom-environment-variables.json

```json

{
  "mail": {
    "password": "app_password"
  }
}

```

export app_password = 12345

then,

access it using the line



console.log('Mail Password: ' + config.get('mail.password'));

