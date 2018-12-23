## Event Emitter

Event Emitters

Import require('events')
Extend class Name extends ...
Instantiate new Name()
Add listeners .on()
Emit .emit()

### Without Emitter class

```js

const events = require('events')
class Encrypt extends events {
  constructor(ops) {
    super(ops)
    this.on('start', () => {
      console.log('beginning A')
    })    
    this.on('start', () => {
      console.log('beginning B')
    })
  }
}

const encrypt = new Encrypt()
encrypt.emit('start')

```

### Working with Events

Events are about building extensible functionality and making modular code flexible

.emit() can be in the module and .on() in the main program which consumes the module
.on() can be in the module and .emit() in the main program, and in constructor or in instance
pass data with emit()
error is a special event (if listen to it then no crashes)
on() execution happen in the order in which they are defined (prependListener or removeListener)

### Promises vs Events

Events are synchronous while Promises are typically asynchronous
Events react to same event from multiple places, Promise just from one call
Events react to same event multiple times, then just once

### nextTick in class
Again, nextTick helps to emit events later such as in a class constructor

```js

class Encrypt extends events {
  constructor() {
    process.nextTick(()=>{  // otherwise, emit will happen before .on('ready')
      this.emit('ready', {})
    })
  }
}
const encrypt = new Encrypt()
encrypt.on('ready', (data) => {})

```