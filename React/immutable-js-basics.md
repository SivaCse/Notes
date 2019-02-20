# Understanding Immutable.Record

Functional programming principles and with it immutable data are changing the way we write frontend applications. If the recent de-facto frontend stack of [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/) feels like it goes perfectly together with immutable data, that's because it's specifically [designed](https://facebook.github.io/react/docs/advanced-performance.html) [for that](https://facebook.github.io/react/docs/update.html).

There's several interesting implementations of immutable data for JavaScript, but here I'll be focusing on Facebook's own [Immutable.js](https://facebook.github.io/immutable-js/), and specifically on one of its lesser known features, [Records](https://facebook.github.io/immutable-js/docs/#/Record).

## Why Records?

Immutable.js provides a beautiful, [Clojure-inspired](https://facebook.github.io/immutable-js/#javascript-first-api) API for dealing with abstract Collections and Sequences, and several concrete data structures that implement that API, such as Lists, Maps and so on. The only ugly spot, so to speak, on the API is accessing Map values. With traditional JS objects, you're used to going:

```js
const bear = { sound: 'growl' }
bear.sound // => 'growl'
```

But with Immutable.Map -- the thing you get when converting directly from JS to Immutable -- it's not as convenient:

```js
import { fromJS } from 'immutable'
const bear = fromJS({ sound: 'growl' })
bear.sound // => undefined
bear.get('sound') // => 'growl'
```

That `.get()` stuff is somewhat awkward syntax for something that you'll be doing **a lot** across your codebase, especially as JS devs are used to the convenience of simply dot-accessing properties of objects.

Records bridge this convenience gap in property access:

```js
import { Record } from 'immutable'
const Animal = Record({
  sound: 'unknown' // this is the default value if no 'sound' is set
})
const bear = new Animal({
  sound: 'growl'
})
bear.sound // => 'growl'
bear.get('sound') // => 'growl'
```

Yay, we got our convenience back! In fact, our `Animal` Record is best thought of as an Immutable.Map with two special powers:

1. It allows its keys to be read with standard dot-access (writing still requires `.set()` and friends, understandably)
2. It always contains exactly the keys listed in its original definition (meaning keys can't be added or removed)

It's important to note that this is *in addition* to the full Map API, meaning you still have all the power of e.g. `.getIn()` if you need it, and a function that expects a Map will equally work with a Record. (An oft-requested feature on the [issue-tracker](https://github.com/facebook/immutable-js/issues) is the ability to also enforce rules for the values of these keys, but alas, it's not there yet.)

This may or may not sound like a big deal on its own -- I would guess this sounds like a bigger deal to those who've written a lot of code tranforming Immutable data to React elements, and gotten tired of typing `.get('')` over 9000 times a day. But in addition, the unexpected virtue of looking exactly like regular JS objects (for the purposes of property access, anyway) is that many things that work nicely with regular JS objects suddenly work the same with your Immutable.js data.

For instance, you can destructure your Records just like regular JS objects:

```js
const bear = new Animal({
  sound: 'growl'
})
const { sound } = bear
sound // => 'growl'
```

Also, many convenience methods from [lodash](https://lodash.com/docs) suddenly work again, and can be used to complement the Immutable.js API:

```js
import { List } from 'immutable'
import { matches } from 'lodash'

const bear = new Animal({ sound: 'growl' })
const wolf = new Animal({ sound: 'growl' })
const chihuahua = new Animal({ sound: 'laughable' })

const zoo = new List([ bear, wolf, chihuahua ])
zoo.filter(matches({ sound: 'growl' })) // => new List([ bear, wolf ])
```

In short, Records offer more than just getting the dot-access convenience back -- they allow your Immutable data to play nicer together with the rest of the JS ecosystem that expects plain objects.

## How Records?

So Records are pretty sweet but... what's the catch? If your JS application never exchanges data with the outside world, there really is no catch. Go make your application Records all the way down!

Just about every useful application **does** some input & output, though, and in the case of frontend applications, you're most often reading in JSON from some data source, and perhaps sending it back. And therein lies the rub: you lose a lot of the convenience you have in converting arbitrary JSON to/from Maps and Lists with `fromJS()` and `.toJS()`.

Let's say we received this data from a JSON API:

```js
const zooJSON = [
  { sound: 'growl' },
  { sound: 'bark' },
  { sound: 'hiss' },
]
```

How does `fromJS()` know those objects should be converted to `Animal` Records, instead of regular Immutable.Maps? Well, it doesn't. We do know, however, so when our data comes from a source known to give us Animals, we can go:

```js
const immutableZoo = new List(zooJSON).map(Animal) // => List<Animal>
```

Again, if this is the extent of your data exchange needs, you're golden!

But sometimes you need to convert more complex JSON back to their Immutable counterparts. That JSON could contain many, many different Record types, sometimes as part of a List, sometimes as part of a Map. A great example of this are the latest debugging tools for React/Flux architectures, that allow you to serialize your entire application state into a bunch of JSON, and then use that dump for [time-travel debugging, regression testing or even sending crash dumps to your server for later analysis](https://vimeo.com/166342150). React/Redux apps capable of server-side rendering (now known as [Universal JavaScript apps](https://medium.com/@mjackson/universal-javascript-4761051b7ae9)) often also require the ability to serialize the entire app state into a JSON blob.

A full JSON dump of a Redux store could look like this, for example:

```js
const storeState = { // RootStoreState
  users: [ // List
    { name: 'Jarno' }, // User
    { name: 'Alice' }, // User
    { name: 'Bob' }, // User
  ],
  ownerToAnimalMap: { // Map
    Jarno: { sound: 'hiss' }, // Animal
    Bob: { sound: 'bark' }, // Animal
  },
  trendingUsersAndAnimals: [ // List
    { name: 'Alice' }, // User
    { sound: 'growl' }, // Animal
  ],
}
```

So in an ideal world, we'd want a **custom `fromJS()` implementation** that takes in arbitrary JSON, and returns revived Immutable data structures that use the correct Record types (`Animal`, `User` and `RootStoreState`) in the correct places. Note that this isn't only useful in reviving Redux store dumps; the same `fromJS()` is a versatile tool:

```js
import { fromJS } from './utils/immutable' // this is our custom fromJS() implementation

ajaxGET('/api/users').then(fromJS) // => Promise<List<User>>
ajaxGET('/api/animals').then(fromJS) // => Promise<List<Animal>>

fromJS(JSON.parse(localStorage.lastEditedAnimal)) // Animal

fromJS(storeState) // => RootStoreState
```

Immutable.fromJS has a [built-in hook](https://facebook.github.io/immutable-js/docs/#/fromJS) for customizing the types it returns, but the core problem remains:

**How do we tell our Record types apart?**

There's several strategies we can go with!

### Strategy #1: Duck typing

**tl;dr: You probably don't want this.**

> If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.

If our custom `fromJS()` sees an Immutable.Map that has the field `sound` it's an `Animal`, and if it has the field `name` it's a `User`, right? All other types (meaning Maps and Lists) can be left as-is. Sounds nice and simple!

First, we need our Record types:

```js
const Animal = Record({
  sound: null,
})
const User = Record({
  name: null,
})
const RootStoreState = Record({
  users: new List(),
  ownerToAnimalMap: new Map(),
  trendingUsersAndAnimals: new List(),
})
```

Then, let's define our custom `fromJS()` implementation:

```js
import { Map, is, Iterable, fromJS as originalFromJS } from 'immutable'

const knownRecordTypes = new Map({
  Animal,
  User,
  RootStoreState,
})

const isRecord = knownRecordTypes
  .mapKeys((_, Type) => Type) // key the Map by the Record constructors
  .map(Type => new Type().keySeq().toSet()) // map the values to Immutable.Sets of Records' keys
  .map(keySet => is.bind(null, keySet)) // map to functions that test equality of the key Sets

export function fromJS(any) {
  return originalFromJS(any, (key, value) => {
    if (Iterable.isIndexed(value)) return value.toList() // we're reviving an array -> it's a List
    const actualKeySet = value.keySeq().toSet() // these are the keys of the Map we're reviving
    const MatchingType = isRecord.findKey(test => test(actualKeySet)) // compare to each known Record type
    if (MatchingType) return new MatchingType(value) // we found a matching Record type -> instantiate it
    return value.toMap() // no matching Record type found -> it's a plain old Map
  })
}
```

The upside of this strategy is that adding new Record types is very simple: just define one and add it to `knownRecordTypes`, and it's picked up automatically anywhere it's encountered. It's duck typing in its purest form: if a Map has all the fields of a `User`, it **is** a `User`.

The significant downside is that data models tend to change over time. New fields are added, and old ones are removed. Sometimes [this can happen wholly without your consent](https://github.com/jareware/pointing-fingers), when talking directly to 3rd party API's for instance. When this happens, your code accessing `bear.sound` suddenly starts evaluating to `undefined`, because what we assumed was an `Animal` has turned back to a vanilla Map (and you should use `bear.get('sound')` instead). Even if you fully control your app's data sources, you need to take care to release updates to your frontend application and your backend at the same time, to ensure your `knownRecordTypes` match on the server and the client.

A perhaps tempting alteration to this duck typing strategy is to only consider specific fields. In terms of our example, we could use the presence of the key `sound` to always revive an `Animal`, and `name` to revive a `User`.

The upside is that you don't need to care if any other fields are added and removed. Your custom `fromJS()` implementation can even check your `knownRecordTypes` and loudly barf at startup time if your Records contain overlapping field names -- which is always a good idea, because eventually someone **will** forget that limitation.

The obvious and glaring downside is that external data sources can still ruin your day. Consider your 3rd party `ajaxGET('/api/animals')` one day adding a `name` field for each animal (naming animals is not wholly a foreign concept). Suddenly your `Animal` and `User` Records *may* start getting mixed up. A source of added hilarity is that the choice between Record types is actually determined by the order of the key tests within `fromJS()`. If you test for more than 1 field per Record type (the cap being all fields of each type) you of course decrease the chances of this happening. One could also argue that upstream API's changing without notice will break stuff *regardless* of what you do. Still, tread carefully.

### Strategy #2: Type flags

**tl;dr: You might want this!**

A more robust alternative is of course to not *guess* about these things at all, and instead boldly mark your Record types (the field name `REC_TYPE` is arbitrary, you could just call it `type` or whatever):

```js
const Animal = Record({
  REC_TYPE: 'Animal',
  sound: null,
})
const User = Record({
  REC_TYPE: 'User',
  name: null,
})
const RootStoreState = Record({
  REC_TYPE: 'RootStoreState',
  users: new List(),
  ownerToAnimalMap: new Map(),
  trendingUsersAndAnimals: new List(),
})
```

Keep in mind that since each Record already has the correct `REC_TYPE` in its set of *default values*, you don't ever need to care about them when instantiating:

```js
const bear = new Animal({ sound: 'growl' })
bear.REC_TYPE // => 'Animal'
```

Thus, your JSON dump would look like this:

```js
const storeState = {
  REC_TYPE: 'RootStoreState',
  users: [
    { REC_TYPE: 'User', name: 'Jarno', },
    { REC_TYPE: 'User', name: 'Alice', },
    { REC_TYPE: 'User', name: 'Bob' },
  ],
  ownerToAnimalMap: {
    Jarno: { REC_TYPE: 'Animal', sound: 'hiss' },
    Bob: { REC_TYPE: 'Animal', sound: 'bark' },
  },
  trendingUsersAndAnimals: [
    { REC_TYPE: 'User', name: 'Alice' },
    { REC_TYPE: 'Animal', sound: 'growl' },
  ],
}
```

And our `fromJS()` implementation is rather trivial:

```js
import { Map, Iterable, fromJS as originalFromJS } from 'immutable'

const knownRecordTypes = new Map({
  Animal,
  User,
  RootStoreState,
})

export function fromJS(any) {
  return originalFromJS(any, (key, value) => {
    if (Iterable.isIndexed(value)) return value.toList() // we're reviving an array -> it's a List
    const MatchingType = knownRecordTypes.get(value.get('REC_TYPE')) // check if we know a Record with this type
    if (MatchingType) return new MatchingType(value) // we found a matching Record type -> instantiate it
    return value.toMap() // no matching Record type found -> it's a plain old Map
  })
}
```

The upside is that it's very obvious when Records need to be instantiated, and when regular Maps are intended. This can be helpful also while debugging, as it's very easy to spot your different data types, even when serialized to JSON.

The downside is that you get an extra field to all your Records. Whether or not this bothers you depends (being able to `.filter(matches({ REC_TYPE: 'User' }))` can be handy!), but if the external API's you'll be sending data to get upset about extra fields, you may want to implement a custom `toJS()` function that strips away the special `REC_TYPE` field before serializing to JSON. And conversely, if the API's you'll be reading from don't have the special `REC_TYPE` field, you're out of luck with the automatic revival again.

### Strategy #3: Explicit instantiation

**tl;dr: You probably want this!**

Our original problem was automatically telling our Record types apart when we revive them from plain JS objects. That *automatically* part isn't always necessary, though: most of the time you know exactly the type of data you're reviving. In fact, in most common use we lose very little convenience:

```js
import { fromJS } from './utils/immutable' // this is our custom fromJS() implementation

ajaxGET('/api/users').then(fromJS.User) // => Promise<List<User>>
ajaxGET('/api/animals').then(fromJS.Animal) // => Promise<List<Animal>>

fromJS.Animal(JSON.parse(localStorage.lastEditedAnimal)) // Animal

fromJS.RootStoreState(storeState) // => RootStoreState

// We can still revive non-Records, too:
fromJS({ foo: 'bar' }) // => Map
```

How is this different from just directly using `new Animal()`, you might ask. In two subtle-but-important ways:

1. It allows us to enforce a deep `fromJS()` conversion before converting to a Record. An oft-missed intricacy of Immutable.js is that it's **not deeply immutable** by default, meaning that `new RootStoreState({ users: [] })` would result in a Record that contains a **vanilla, mutable JS array**. Something that's easy to miss, but can cause wonky behaviour. (Even though defaulting to deep immutability might seem intuitive, there's [compelling arguments both ways](https://github.com/facebook/immutable-js/issues/473).)
1. It allows us to not export the Record constructors outside of our `utils/immutable` module at all. This ensures there's only one possible way to construct them, namely the deeply-immutable way described above.

TODO:

```js
const knownRecordTypes = new Map({
	Animal,
  User,
  RootStoreState,
})

function fromJS(any) {
	return originalFromJS(any)
}

// By default, ensure deep conversion with fromJS() and then invoke Record constructor:
knownRecordTypes.forEach((Type, name) => fromJS[name] = (any => new Type(fromJS(any))))

// For complex types, explicitly convert nested Record types where appropriate:
fromJS.RootStoreState = any => new RootStoreState(fromJS(any))
	.update('users', list => list.map(fromJS.User))
  .update('ownerToAnimalMap', map => map.map(fromJS.Animal))
  .update('trendingUsersAndAnimals', list => list.map(map => (map.has('sound') ? fromJS.Animal : fromJS.User)(map)))
```

## Tips & Tricks

* is.User
* fromJS.User
* React PropTypes
* Flow/TS

Auto-generated Record types don't work because of general-purpose Maps :)

https://github.com/facebook/immutable-js/issues/341

_.pick(record, 'fieldA', 'fieldB')


###Object Immutability in JavaScript
Natively, objects are mutable in JavaScript. However, if we're careful enough, we can implement some immutability. Amongst other methods, we can use the following:

* The spread operator: The ... operator can be used to transform the properties of an object and returns a new object which is the result of the mutation.
* Object.assign: Object.assign(target, ...sources). This method is used to copy the values of all enumerable own properties from one or more source objects to a target object.
* Other non-mutating array methods like filter, concat and slice.