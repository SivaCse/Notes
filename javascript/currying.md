## Currying
currying is the process of breaking down a function into a series of functions that each take a single argument.

for example add(1,2,3) into add(1)(2)(3).

### Benefits
* Prevents to pass same variable multiple time
* it helps to create Higher order function.
* Currying node.js functions can allow for sequential and parallel I/O processing of multiple files, much like the async library for node.js
* used to write reusable functions

Example 

```js
function func(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
    }
  }
}

func(2)(3)(4); // 24

```
## Reusablity Example

```js
const movies = [
  {
    "id": 1,
    "name": "Matrix"
  },
  {
    "id": 2,
    "name": "Star Wars"
  },
  {
    "id": 3,
    "name": "The wolf of Wall Street"
  }
]

movies.map((movie) => movie.id) // not so good


const series = [
  {
    "id": 4,
    "name": "South Park"
  },
  {
    "id": 5,
    "name": "The Simpsons"
  },
  {
    "id": 6,
    "name": "The Big Bang Theory"
  }
]

series.map((serie) => serie.id) // again duplicate code
```

### solution

```js

const get = property => object => object[property];

movies.map(getId); //should return [ 1, 2, 3 ]
series.map(getId); //should return [ 4, 5, 6 ]

const getName = get('name');

movies.map(getName); //should return [ 'Matrix', 'Star Wars', 'The wolf of Wall Street' ]

```

## Real World Examples

### Function.prototype.bind 

```js
var add = (a,b) => a+b;

console.log(add(1,2));

var increment = add.bind(undefined, 1)
console.log(increment(4));

// The problem here is we have to alter `this`


export default connect(mapStateToProps)(TodoApp) // react redux connect function
```

### Event Handling

```js
const handleChange = (fieldName) => (event) => {
  saveField(fieldName, event.target.value)
}
<input type="text" onChange={handleChange('email')} ... />

```

### Rendering HTML

```js
renderHtmlTag = tagName => content => `<${tagName}>${content}</${tagName}>`

renderDiv = renderHtmlTag('div')
renderH1 = renderHtmlTag('h1')

console.log(
  renderDiv('this is a really cool div'),
  renderH1('and this is an even cooler h1')
)

```
