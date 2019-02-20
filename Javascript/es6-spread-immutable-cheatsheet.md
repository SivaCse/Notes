### update object

```javascript
var state = {
    id: 1,
    points: 100,
    name: "Goran"
};

var newState = {
    ...state,
    points: 120
}

console.log(newState);
/* 
  {
    id: 1,
    points: 120,
    name: "Goran"
  }
*/
```

### update array

```javascript
var state = [1,1,1,1];

// state[2]++ // [1,1,2,1]
var index = 2;
var newState = [
    ...state.slice(0, index),
    state[index] + 1,
    ...state.slice(index + 1)
];
console.log(newState);
/*
  [1,1,2,1]
*/
```

### filter object with Array.prototype.reduce

```javascript
const items = {
  1: {
    id: 1,
    name: "Goran"
  }, 
  2: {
    id: 2,
    name: "Petar"
  }
};

const filterId = 1;

const filteredItems = Object.keys(items).reduce( (accumulator, key) => (
   items[key].id === filterId ? accumulator : {
       ...accumulator,
       [key]: items[key]
   }                                        
), {});

console.log(filteredItems);
/*
  {
    2: {
      id: 2,
      name: "Petar"
    }
  }
  }
*/
```

### update array with objects using Array.prototype.slice
```javascript
var state = [
  {name: "Goran"},
  {name: "Peter"}
]

// you can use es6 Array.prototype.findIndex to find index of the object
// let index = state.findIndex(({name}) => name === "Peter");
var index = 1;
var field = 'name';
var value = 'Zika';

var newState = [
  ...state.slice(0, index),
  {
    ...state[index],
    [field]: value
  },
  ...state.slice(index + 1)
];

console.log(newState);
/*
  [
    {name: "Goran"},
    {name: "Zika"}
  ]
*/
```

### normalize array and merge with id=>val object

```javascript
var items = {1: {name: "Airplane", id: 1}, 2: {name: "Spaceship", id:2}};
var receivedItems = [{id: 3, name: "Quadrocopter"}, {id: 4, name: "Helicopter"}];
var newState = {
    ...items,
    ...receivedItems.reduce((obj, item) => ({
        ...obj,
        [item.id]: item
    }), {})
}
console.log(newState);
/*
{
    1: {name: "Airplane", id: 1}, 
    2: {name: "Spaceship", id: 2},
    3: {name: "Quadrocopter", id: 3},
    4: {name: "Helicopter", id: 4}
}
*/




const characters = [ 'Obi-Wan', 'Vader' ]
const newCharacters = [ ...characters, 'Luke' ]
console.log(characters === newCharacters) // false
console.log(characters) // [ 'Obi-Wan', 'Vader' ]
console.log(newCharacters) // [ 'Obi-Wan', 'Vader', 'Luke' ]



const characters = [ 'Obi-Wan', 'Vader', 'Luke' ]
// Removing Vader
const withoutVader = characters.filter(char => char !== 'Vader')
console.log(withoutVader) // [ 'Obi-Wan', 'Luke' ]
// Changing Vader to Anakin
const backInTime = characters.map(char => char === 'Vader' ? 'Anakin' : char)
console.log(backInTime) // [ 'Obi-Wan', 'Anakin', 'Luke' ]
// All characters uppercase
const shoutOut = characters.map(char => char.toUpperCase())
console.log(shoutOut) // [ 'OBI-WAN', 'VADER', 'LUKE' ]
// Merging two character sets
const otherCharacters = [ 'Yoda', 'Finn' ]
const moreCharacters = [ ...characters, ...otherCharacters ]
console.log(moreCharacters) // [ 'Obi-Wan', 'Vader', 'Luke', 'Yoda', 'Finn' ]

```