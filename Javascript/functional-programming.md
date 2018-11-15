Functional programming sample
=========================

```js 

const items = [
 { name: 'ball', points: 2 },
 { name: 'coin', points: 3 },
 { name: 'candy', points: 4 }
];

const upperCase = val => val.toUpperCase();

const upperCaseMapper = (val) => upperCase(val.name);

const result = items.map(upperCaseMapper);

console.log(result,'Result is ');

```
====================================
```js

const items = [
 { name: 'ball', points: 2 },
 { name: 'coin', points: 3 },
 { name: 'candy', points: 4 }
];

const upperCase = val => val.toUpperCase();

const upperCaseMapper = (val) => upperCase(val);

const extractProp = (prop) => (obj) => obj[prop];

const result = items.map(extractProp('name')).map(upperCaseMapper);

console.log(result,'Result is:');
```
====================================
```js

const people = [
 { name: 'Sekar', cibilScore: 1000 },
 { name: 'Siva', cibilScore: 0 },
 { name: 'Thiru', cibilScore: 20000 }
];

const upperCase = val => val.toUpperCase();

const upperCaseMapper = (val) => upperCase(val);

const extractProp = (prop) => (obj) => obj[prop];

const greaterThanZero = (val) => val > 0

const predicate = (val) => greaterThanZero(val.cibilScore)

const result = people
.filter(predicate)
.map(extractProp('name'))
.map(upperCaseMapper);

console.log('Result is ', result);
```
================================================

### Title Case Example
======================

```js

console.clear();

var str = "hi how are you?";

const splitByNeedle = (str, needle = ' ') => str.split(needle); 

const caseMapper = (fn) => ([f, ...rest] = [...v]) => `${f[fn]()}${rest.join('')}`

const upperCase = caseMapper('toUpperCase');

var output = splitByNeedle(str).map(upperCase).join(' ')
	
console.log(output); // Hi How Are You?

```

findUniq
========
```js

var ar = ['a','b','c','d','a','e','a','f','a','b','c','c','a','b','z'];

var result = {};

var findUniq = (arr) => new Set(arr);

var findLength = (arr, key) => arr.filter((val) => val === key).length;

[...findUniq(ar)].map((val) => result[val] = findLength(ar,val));

console.log(result,'result');

```
Partial Example
===============
```js

var ar = ['a','b','c','d','a','e','a','f','a','b','c','c','a','b','z'];

var result = {};

var findUniq = (arr) => new Set(arr);

var findLengthPartial = (arr) => (key) => result[key] = arr.filter((val) => val === key).length;

[...findUniq(ar)].forEach(findLengthPartial(ar));

console.log(result,'result');
```
findWhere 
==========
```js

const spotifySongs = [
 { id: 1, name: "Curl of the Burl", artist: "Mastodon", duration: 204 },
 { id: 2, name: "Oblivion", artist: "Mastodon", duration: 306 },
 { id: 3, name: "Flying Whales", artist: "Gojira", duration: 444 },
 { id: 4, name: "L'Enfant Sauvage", artist: "Gojira", duration: 246 }
];

findWhere = (context,{name:"Curl of the Burl"})

result

{ id: 1, name: "Curl of the Burl", artist: "Mastodon", duration: 204 }
```
-----------------------------------------

var a = [{name:"a"},{name:"b"},{name:"c"}];
var b = [{name:"c"},{name:"a"},{name:"d"}];

===========================

Answers
-------
```js

var set = new Set();

for(let item of [...a,...b]){
set.add(item.name)
}

[...set].map(val => ({name:val}))

console.log([...set].map(val => ({name:val})));
```
===============
```js

var a = [{name:"a"},{name:"b"},{name:"c"}];
var b = [{name:"c"},{name:"a"},{name:"d"}];

var set = new Set();

[...a,...b].forEach((item)=>set.add(item.name));

const result = [...set].map(val => ({name:val}));

console.log(result);

```

Compare two objects are equal
-----------------------------
```js

var obj1 = {name:"a",age:1,sex:'M'};
var obj2 = {name:"a",sex:'M',age:1};

const isEqual = Object.keys(obj1).sort().join() === Object.keys(obj2).sort().join() && Object.values(obj1).sort().join() === Object.values(obj2).sort().join();

console.log(isEqual);
```

Sort an array without sort() 
=============================
```js

var arr = [9,6,8,7,5,0,2,12,3];

for(let i=0; i<arr.length; i++) {
for(let j=i+1; j<arr.length; j++){
  if(arr[i] > arr[j]) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
 }
}
}

console.log(arr);
```
============================
```js

sort array of strings in asc order
-------------------------------------
var arr = ['b','c','a'];
["a", "b", "c"]
for(let i=0; i<arr.length; i++) {
for(let j=i+1; j<arr.length; j++){
 if(arr[i].localeCompare(arr[j]) > arr[j].localeCompare(arr[i])) {
   let temp = arr[i];
   arr[i] = arr[j];
   arr[j] = temp;
}
}
}
```
-----------------------------

Create a own set data structure
===============================
```js

class MySet{
  collection = [];
  
  add(value){
    this.isExist(value);
  }

  isExist(value){
    const item = this.collection.find((val) => value);
    if(!item){
      this.collection.push(value);
    }
  }

  get items(){
    return this.collection
  }
  
}

var mSet = new MySet();

mSet.add({name:"Siva"});
mSet.add({name:"Siva"});
mSet.add({name:"Siva"});

console.log(mSet.items);

```
=================================

find and remove duplicate without Set data structure
----------------------------------------------------
```js

class MySet{
  collection = [];
  
  add(value){
    this.isExist(value);
  }

  isExist(value){
    const item = this.collection.find((val) => val === value);
    if(!item){
      this.collection.push(value);
    }
  }

  get items(){
    return this.collection
  }
  
}

var a = [{name:"a"},{name:"b"},{name:"c"}];
var b = [{name:"c"},{name:"a"},{name:"d"}];

var set = new MySet();

[...a,...b].forEach((item)=>set.add(item.name));

const result = set.items.map(val => ({name:val}));

console.log(result);
```
==========================================

JS Object immutable sample ( will helpfull for Redux reducer)
--------------------------------------------------------------
```js

const state = {
  users:[],
  currentUser:{name:"Siva"},
  isLoading:false
}

const users = [1,2,3,4,5,6,7,8,9,10];

// const combined = {...state,...{users:users}}

// const combined = {...state,...{isLoading:true}}

// const combined = {...state,...{currentUser:{...state.currentUser,age:33}}}

const updateFive = () => {
  return [].concat(users.slice(0,4),55,users.slice(5));
}

 const combined = {...state,...{users:updateFive()}}

console.log(combined);

const tasks = [{name:"a"},{name:"b"},{name:"c"}];

const updatedTask = {name:"bb"};

const updateOperation  = tasks.map((val,index)=>{
  if(index===1){
    return updatedTask; 
  }
  return val;
})

console.log(updateOperation,'updateOperation')
```
==============================================

Number to words
===============
```js

const words = {
  '0': 'Zero',
  '1': 'One',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four'
};

const phrases = {
  '1': (val)=> words[val],
  '2': (val)=> aliasWords[val],
  '3': 'hundred',
  '4': 'thousand'
};

const aliasWords = {
  '1': '',
  '2': 'twenty',
  '3': 'thirty',
  '4': 'fourty'
};



const toPhrases = (arr, index, val, word) => {
   const length = arr.length;
   const isTenBase =  length-index <= 2;
   const phrase = isTenBase ? phrases[arr.length-index](val)+'' : phrases[arr.length-index]+' and';
   return length-index>2 ? word+' '+phrase : phrase;
}

const number = '2222';

const toWords = number.split('').map((val, index, arr)=> toPhrases(arr, index, val, words[val])).join(' ');

console.log(toWords);

```
===============================

Access deep nested objects value
================================
```js

console.clear();

const obj = {
  a:{
    name: "name a",
    b: {
      name: "name b",
      c:{
        name: "name c",
        d:{
          name: "name d",
          e:{
            name: "name e",
            age: 6
          }
        }
      }
    }
  }
}


const findDeep = (array, src) => array.reduce((acc, value)=> (value === array.slice(-1)) ? acc[array.slice(-1)] : acc[value],obj);

const result = findDeep('a.b.c.d.e.age'.split('.'), obj);

console.log(result)
```
============================================================

find maximum length string in an array
======================================
```js

const array = ['o','tw','thr','four','some big verd','five5','six666','seven77','eight888'];

const index = array.map(({length})=>length).findIndex((v, k, arr)=> v === Math.max(...arr));

console.log(array[index])
```
======================================

find string is palindrome
-------------------------
```js

const str = "malayalam";

const result = [...str].reduceRight((curr,next)=> curr+next)

console.log(result === str);
```
============================================

recursion
---------
```js

const factorial = (num) => {
 if(num === 0) {
  return 1;
 } else {
   return num * factorial(num-1)
 }
 
}

```
============================================

Please concentrate following sub topics in es6 modules learning:

1) export mutablity

2) export bindings 

3) re-exports

4) circular dependency

5) hoisting in exports

6) computed loading

7) on demond loading

8) dynamic module specification

following links will help

http://2ality.com/2015/07/es6-module-exports.html

http://2ality.com/2017/01/import-operator.html

Explain about functional programming in js?

how many ways we can access this from inside a function?
var self = this , bind() method

difference between iterators and generators?

explain garbage collection and memory management?

difference for...in and for...of

how Array.reduce function works?

benefits of Map over Object?

some ES6 Array and string functions?

what is TDZ in ES6?

Explain about Webservices?

SOAP and REST

soap is protocal, but rest is design philosophy
soap is extra markup, but rest is light weight
some complex , rest is easy to build

=========================

Angular constructor - ngOnInit difference
----------------------------------------

built in - user defined

dependency injection purpose - binding inputs anter DI complete

it will call at instantiation - called from a component when injected all required dependencie

======================

Javascript API reference
------------------------

https://www.javascripture.com/FileReader

===================================

Javascript memory leak notes
---------------------------

causes for m leak
1) Accidental global variables 

    means declaring variable without var will cause adding the variable inot the window
    and it will not GC easily.
    to prevent this add 'use strict' at top

2) Forgotten timers or callbacks    

3) Closures : anonymous functions will get parent functions scope


---------------------------------

Javascript Binery Search
========================
```js

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

------------------------------

Reference equality, shallow equality and deep equality
-----------------------------------------------------

