### How modules are searched?

1 ) name.js
2 ) name.json
3 ) name.node (compiled addon example)
4 ) name/index.js

### Caching

require.cache has the cache

```js

require('./module-4.js')
delete require.cache[require.resolve('./module-4.js')]
require('./module-4.js')

```

### Exports

Patterns

Export Function
Export Class
Export Function Factory
Export Object
Export Object with Methods

```js

module.exports = () => {

}


```