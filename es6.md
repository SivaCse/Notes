# Es6 Notes for future reference

### Strict Mode

Es5 - manual enable.

Es6 - enable by default.


### Scope

Es5 - Block scope is achieved by var ( function level ).

Es6 - Block scope is achieved by let/const.


### let

* ) let and const are scoped to the nearest enclosing block.
* ) variables declared using let can read/assign values inside block
* ) use inside loop,  so using setTimeout inside loop will get every value instead of last one
* ) Adding var at the top level will add the variable in the global object but for let this wont happen
* ) Temporal deadzone is the area from the start of the block to intialization of the variable.
* ) at the temporal dead zone let will throw Reference Error
* ) let can be declared without value. but const cant.


Ex 1
```js
{
  let myName="Siva";
  myName="Kannan";
  console.log(myName) // Kannan
}
console.log('name outside',myName) // Uncaught ReferenceError: myName is not defined
```

here , let is surrounded by { } .

```js
var x = 'global';
let y = 'global';
console.log(this.x); // "global"
console.log(this.y); // undefined
// source is from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
```

```js
function do_something() {
  console.log(bar); // undefined
  
  var bar = 1;
  let foo = 2;
}
// line 48 to 51 is called temporal deadzone
```

### const

* ) used to define variables which are read only
* ) reference behaves differently . see example
* ) value must on declaration. i e const name; will throw error. but let wont

Ex 1
```js
{
  const myName="Siva";
  myName="Kannan"; // Uncaught TypeError: Assignment to constant variable.
  console.log(myName)
}
console.log('name outside',myName)
```
Ex 2
```js
{
  const myName="Siva";
  console.log(myName)
}
console.log('name outside',myName)  // Uncaught ReferenceError: myName is not defined
```
Siva

Ex 3 : reference assignment
```js
	const obj = {name:"A"};
	obj.age=21;
	console.log(obj)
```
	output will
	[object Object] {
	  age: 21,
	  name: "A"
	}

Ex 4 : use freez to prevent modifications
```js
	const ro = Object.freeze({name:"Siva"})
	ro.name = "Bharathi" // wont add
```  

Ex 5:
```js
	const arr = [1,2,3];

	for (const [index, elem] of arr.entries()) {
	        const message = index + '. ' + elem;
	        console.log(message);
	    }
```


### How to create a Private block scope in Es6 ( standard way )
```js
if(true) {
	// define your private variables i.e let and const
}
```

Note this is alterate of IIFE in ES5

--------------------------------------

### Template Literals
```js
const name = 'Kannan';   
console.log(`Hello ${name}`);
```

### Arrow functions

* can create functions without function keyword
* can return value without return keyword
* Multiline needs return keyword  if ..
* single paramater no need ( and )
* use const keyword on outside class
* Shorter syntax
* manage this context ( arrow functions capture the this value of the nearest enclosing context )

Ex 1
```js
    sayHello = () => console.log('Hi');
    sayHello()
    Hi
```    

Ex 2
```js
	sayHello = () => {
	const name = "Hi";
	console.log('line 1');
	console.log('line 2');
	}
```
Ex 3
```js
	sayHello = param => console.log(param);
```

Ex 4 Return Object
```js
	const sayHello = () => ({
	name:"Siva",
	message:"Hello"
	})		
```
### Short Hand object literals
```js
const obj = {
    foo() {
        console.log('inside foo')
    },
    bar() {
        this.foo();
    },
}

obj.foo();
```

### Destructuring

* ) Destructuring is a convenient way to get values out of arrays and objects.
* ) try to destructure a variable that’s not contained within an object. It will just return undefined.

Ex 1 Arrays
```js
	let [day,month,year] = "11/11/2017".split("/")
	console.log(day,month,year)

	let [,month,year] = "11/11/2017".split("/") // skip one
	console.log(month,year)
```
Ex 2 Objects
```js
	const student = {name:"Siva",address:"KK dist",age:32};

	const {address} = student;

	console.log(address)
```
Ex 3 : use let for writable
```js
	let {address} = student;
    address = "new address";
	console.log(address)
```


Ex 4 Object Alias
```js
	const student = {name:"Siva",address:"KK dist",age:32};

	const {address:myAddress} = student;

	console.log(myAddress,'Just as alias')
```
Ex 5 return with destructure
```js
	function address() {
	  const street = "Street Name";
	  const district = "KK";
	  const state = "TN";
	  return {
	    street,
	    district,
	    state
	  }

	}

	const obj = address();

  console.log(obj)

```


### for .. of

for loop - can break loop
forEach  - can't break loop
for .. of is mixing of above two loops. can break and iterate collections. can use Destructuring

Ex 1
```js
	const names = ["a","b","c"];
	for(let name of names) {
	    if (name === "c") {
	        break;
	    }

	    console.log(name); // wil log a and b only
	}
```
Ex 2 Destructuring
```js
	const names = [{name: 'A', age:1}, {name: 'B', age:2}];
	for(let {name} of names) {
	    console.log('Hello ' + name + '!');
	}
```
Ex 3
```js
	for (const [index, elem] of names.entries()) {
    console.log(index+'. '+elem);
	}
```
### Default Parameter Values

Ex 1
```js
	const sayHello = (name="A") =>{
	  console.log('Hi ',name)
	}

	sayHello()
	sayHello("B")

```

### Spread/Rest operator (...)

* ) ... operator is referred to as spread or rest operator, depending on how and where it is used.
* ) passing parameter to function calling is spread
* ) function body access is rest
* ) is also for creating object from another object

Ex 1:
```js
	const displayDetails = (...details) =>{
	  console.log(details[0])
	}

	const details = ["a",21,'KK Dist'];
	displayDetails(...details)
```  

Ex 2: Concat Two arrays
```js
	const a = [1,2,3]
	const b = [4,5,6]
	const c = [...a,...b];
	console.log(c)
	c[2] = 33;
	console.log(a,b)
```
Ex 3:
```js
	const user = {name: 'a', age: 21}
	const address = {address: 'KK'}
	const combined = {created: '2017-12-31', ...address, ...user}
	console.log(combined);
	combined.name="B";
	console.log(user);
	console.log(combined);
```
Ex 4: array to string another
```js
	Math.max(...[1,2,3])
```

### class less inheritance

 * ) use super keyword to inherit from another object.

Ex :
```js
	const Obj1 = {
    one() {
        console.log("one");
	    }
	}

	const Obj2 = {
	    one() {
	        super.one();
	        console.log("Inherited");
	    }
	}

	Object.setPrototypeOf(Obj2, Obj1);
	Obj2.one();

```

### Class

* is used to create objects
* can implement inheritance easily
* instance using new keyword
* inheritance using extends keyword
* super keyword is must in child class constructor.
* call a parent class method using super.methodname()
* class is not hoisted. create it and use it after not before

Ex 1:
```js
	class Student {
	  constructor() {
	    console.log('From constructor')
	  }

	  getName() {
	    return "Name1"
	  }

	  getActivity() {
	    console.log('Studying...')
	  }
	}

	const s = new Student;

	console.log(s.getName())
	s.getActivity();

```

Ex 2 : Inheritance
```js
	class Student {
	  constructor(name) {
	    this.name = name;
	  }

	  getName() {
    console.log('My Name is',this.name);
	  }

	  getActivity() {
	    console.log('Studying...')
	  }
	}

	class Teacher extends Student {
	  constructor(name) {
	    super(name)
	  }

	  getActivity() {
	    console.log('Teaching...')
	  }
	}

	const t = new Teacher('Ramanujam');

	t.getName();
	t.getActivity();

```

### static keyword in class

* ) access members without instantiation
* ) bit increased performance
* ) cannot be accessed from instances

```js
class Hello {
  static getName() {
    console.log('inside static method')
  }
}

Hello.getName()

```

### Getters and setters in class

```js
class Rectangle {
    constructor( width, height ) {
        this.width = width;
        this.height = height;
    }
    get area() {
        return this.width * this.height;
    }
    set area( value ) {
        console.log( 'Attempting to set area to ' + value );
        throw 'Setting area is not allowed';
    }
}

const myRectangle = new Rectangle(5,2);
console.log(myRectangle.area)
myRectangle.area=100
```

### Maps

Map is a datastructure to hold key value pairs.

Ex 1
```js
	var map = new Map();
	map.set('name',"A");
	map.set('age',21);

	console.log(map.get('name'));

	for (var [key, value] of map) {
	   console.log(key + ': ' + value);
	}

	following can in map object
	map.entries(); 		 // Gives you all the entries in map
	map.keys(); 		 // Gives you all the keys in map
	map.values(); 		 // Gets you the values stored in map
	map.has(keyName); 	 // Checks if a map has specified key or not
	map.delete(keyName); // Replaces the value having the provided key
	map.size;			 // Gives you the size of map
	map.clear();

```

### WeakMaps


* ) collection of key/value pairs
* ) value must reference types
* ) prevent memory leaks by support garbage collection
* ) extend object , let js engine to garbage collection.


### Sets

A datastructure used to hold unique values. duplicate will be removed

Ex 1:
```js
	let set = new Set();
	set.add(1);
	set.add(2);
	set.add(1);
	console.log(set.size) // 2
```  

Ex 2:
```js
	let set = new Set();
	const name = {name:"A"};
	set.add(name);
	set.add({name:"B"});
	set.add(name);
	console.log(set.size)	 // 2
```  

Ex 3:
```js
	let set = new Set();
	const name = {name:"A"};
	set.add([name,{age:21},name]);
	console.log(set)
```

### Weaksets

### String Functions

```js
var city = 'Chennai';
console.log(city.startsWith('C'));
console.log(city.endsWith('i'));
console.log(city.includes('nn'));
console.log(city.repeat(3));
```

### Array Functions


1 ) Array.from
```js
	function fooBar() {
	  console.log(arguments);
	}
	fooBar(1,2,3)

	will output
	[object Arguments] {
		  0: 1,
		  1: 2,
		  2: 3
		}

	function fooBarNew() {
	  console.log(Array.from(arguments));
	}
	fooBarNew(1,2,3)

	will output
	[1, 2, 3]

```  

### Array.fill
```js
	const arr = [1,2,3];

	const replaced = arr.fill(0);

	console.log(replaced) // [0, 0, 0]
```  

### Array.find

	is used to find value match by condition

	Note : value not values (first matched)

	Ex 1:
```js
	const names = [{name:'a',age:1},{name:'a',age:21},{name:'a',age:5}];
	const found = names.find((name)=>name.age>1);
	console.log(found)

	will output
	[object Object] {
	  age: 21,
	  name: "a"
	}
```
### Array.findIndex

	Ex
```js  
	const names = [{name:'a',age:1},{name:'a',age:21},{name:'a',age:5}];
	const found = names.findIndex((name)=>name.age>1);
	console.log(found) // output is 1
```

### Modules

* ) Javascript module is a file that contains exported properties. properties can be a primitive or reference.
* ) There are two types of exports one is default export and another is named export.
* ) Default export properties can import using optional name. but named exports can't.
* ) A javascript module can contain any nmber of named exports but only one default export.
* ) { } braces are used to destructed import

### Iterators

* ) used to keep track of an iterable object.
* ) access one item at a time from a collection.


Ex 1:
```js
	const arr = [11,12,13];
	const itr = arr[Symbol.iterator]();
	console.log(itr.next().value)
	console.log(itr.next().value)
	console.log(itr.next().value)
```


### Symbol

 is used to define unique keys in objects.


### Generators

* ) Nothing but function generate value over time but one at a time
* ) use * before function name
* ) use yield to generate and return value

Ex :
```js
	function *callThreeTimes() {
    let n = 1;
    while (n<4) {
        yield n++
    }
	}

	const numbers = callThreeTimes();
	console.log(numbers.next())
	console.log(numbers.next())
	console.log(numbers.next())
	console.log(numbers.next())
```
