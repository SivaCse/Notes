Functional programming sample
=========================
const items = [
 { name: 'ball', points: 2 },
 { name: 'coin', points: 3 },
 { name: 'candy', points: 4 }
];

const upperCase = val => val.toUpperCase();

const upperCaseMapper = (val) => upperCase(val.name);

const result = items.map(upperCaseMapper);

console.log(result,'Result is ');

====================================

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

====================================

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

================================================

findUniq
========

var ar = ['a','b','c','d','a','e','a','f','a','b','c','c','a','b','z'];

var result = {};

var findUniq = (arr) => new Set(arr);

var findLength = (arr, key) => arr.filter((val) => val === key).length;

[...findUniq(ar)].map((val) => result[val] = findLength(ar,val));

console.log(result,'result');


Partial Example
===============

var ar = ['a','b','c','d','a','e','a','f','a','b','c','c','a','b','z'];

var result = {};

var findUniq = (arr) => new Set(arr);

var findLengthPartial = (arr) => (key) => result[key] = arr.filter((val) => val === key).length;

[...findUniq(ar)].forEach(findLengthPartial(ar));

console.log(result,'result');

findWhere 
==========

const spotifySongs = [
 { id: 1, name: "Curl of the Burl", artist: "Mastodon", duration: 204 },
 { id: 2, name: "Oblivion", artist: "Mastodon", duration: 306 },
 { id: 3, name: "Flying Whales", artist: "Gojira", duration: 444 },
 { id: 4, name: "L'Enfant Sauvage", artist: "Gojira", duration: 246 }
];

function findWhere(spotifySongs,SearchString){
    return spotifySongs.filter((val) => {
        let found = [];
        for(let key in SearchString){
            found.push(SearchString[key] === val[key]);
        }
        return found.every(val => val);
    })
}
const as = findWhere(spotifySongs,{name: "Curl of the Burl",artist: "Mastodon"})
console.log(as);

findWhere = (context,{name:"Curl of the Burl"})

result

{ id: 1, name: "Curl of the Burl", artist: "Mastodon", duration: 204 }

-----------------------------------------

var a = [{name:"a"},{name:"b"},{name:"c"}];
var b = [{name:"c"},{name:"a"},{name:"d"}];

===========================

Answers
-------

var set = new Set();

for(let item of [...a,...b]){
set.add(item.name)
}

[...set].map(val => ({name:val}))

console.log([...set].map(val => ({name:val})));

===============

var a = [{name:"a"},{name:"b"},{name:"c"}];
var b = [{name:"c"},{name:"a"},{name:"d"}];

var set = new Set();

[...a,...b].forEach((item)=>set.add(item.name));

const result = [...set].map(val => ({name:val}));


console.log(result);

===================

Compare two objects are equal
-----------------------------

var obj1 = {name:"a",age:1,sex:'M'};
var obj2 = {name:"a",sex:'M',age:1};

const isEqual = Object.keys(obj1).sort().join() === Object.keys(obj2).sort().join() && Object.values(obj1).sort().join() === Object.values(obj2).sort().join();

console.log(isEqual);

----------------------------------

Sort an array without sort() 
=============================

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

============================

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

-----------------------------

Create a own set data structure
===============================

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


=================================

find and remove duplicate without Set data structure
----------------------------------------------------

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

==========================================

JS Object immutable sample ( will helpfull for Redux reducer)
--------------------------------------------------------------

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

==============================================

Number to words
===============

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


===============================

Access deep nested objects value
================================

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

============================================================

find maximum length string in an array
======================================

const array = ['o','tw','thr','four','some big verd','five5','six666','seven77','eight888'];

const index = array.map(({length})=>length).findIndex((v, k, arr)=> v === Math.max(...arr));

console.log(array[index])

======================================

find string is palindrome
-------------------------

const str = "malayalam";

const result = [...str].reduceRight((curr,next)=> curr+next)

console.log(result === str);

============================================