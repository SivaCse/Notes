```js

import axios from 'axios';
// You can use any cookie library or whatever
// library to access your client storage.
import cookie from 'cookie-machine';

axios.interceptors.request.use(function(config) {
  const token = cookie.get(__TOKEN_KEY__);

  if ( token != null ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function(err) {
  return Promise.reject(err);
});

```