### Question 1. What Is Typescript And Why Do We Need It?

* Answer :

JavaScript is the only client side language universally supported by all browsers. But JavaScript is not the best designed language. It’s not a class-based object-oriented language, doesn’t support class based inheritance, unreliable dynamic typing and lacks in compile time error checking. And TypeScript addresses all these problems. In other words, TypeScript is an attempt to “fix” JavaScript problems.

TypeScript is a free and open source programming language developed and maintained by Microsoft. It is a strict superset of JavaScript, and adds optional static typing and class-based object-oriented programming to the language. TypeScript is quite easy to learn and use for developers familiar with C#, Java and all strong typed languages. At the end of day “TypeScript is a language that generates plain JavaScript files.”

As stated on Typescript official website, “TypeScript lets you write JavaScript the way you really want to. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open Source.” Where “typed” means that it considers the types of variables, parameters and functions.

### Question 2. What Are The Benefits Of Typescript?

* Answer :

TypeScript has following benefits:

It helps in code structuring
Use class based object oriented programming
Impose coding guidelines
Offers type checking
Compile time error checking
Intellisense
### Question 3. What Are Different Components Of Typescript?

* Answer :

There are mainly 3 components of TypeScript:

Language – The most important part for developers is the new language. The language consists of new syntax, keywords and allows you to write TypeScript.
Compiler – The TypeScript compiler is open source, cross-platform and open specification, and is written in TypeScript. Compiler will compile your TypeScript into JavaScript. And it will also emit error, if any. It can also help in concatenating different files to a single output file and in generating source maps.
Language Service – TypeScript language service which powers the interactive TypeScript experience in Visual Studio, VS Code, Sublime, the TypeScript playground and other editor.
### Question 4. How Can You Get Typescript And Install It?

* Answer :

TypeScript can be installed and managed via npm, the Node.js package manager. To install TypeScript, first ensure the npm is installed properly. And then run the following command to install TypeScript globally on your system.

npm install -g typescript

### Question 5. How Do You Compile Typescript Files?

* Answer :

The extension for any TypeScript file is “.ts”. And any JavaScript file is TypeScript file as it is a superset of JavaScript. So change extension of “.js” to “.ts” file and your TypeScript file is ready. To compile any .ts file into .js, use the following command.

tsc <TypeScript File Name>

For example, to compile “Helloworld.ts”:

tsc helloworld.ts

And the result would be helloworld.js.

### Question 6. Is It Possible To Compile .ts Automatically With Real Time Changes In .ts File?

* Answer :

Yes. Using --watch compiler option, this can be achieved.

tsc --watch file1.ts

This will first compile file1.ts in file.js and watch for the file changes. As soon as there is any change detected, it will compile it again. But you need to ensure that command prompt must not be closed, used with --watchoption.

### Question 7. Does Typescript Support All Object Oriented Principles?

* Answer :

YES. There are 4 main principles to Object Oriented Programming: Encapsulation, Inheritance, Abstraction, and Polymorphism. TypeScript can implement all four of them with its smaller and cleaner syntax.

### Question 8. Which Object Oriented Terms Are Supported By Typescript?

* Answer :

TypeScript supports the following object oriented terms:

Modules
Classes
Interfaces
Data Types
Member functions
### Question 9. Which Are The Different Data Types Supported By Typescript?

* Answer :

TypeScript supports the following data types:

Boolean var bValue: boolean = false;
Number var age: number = 16;
String var name: string = "jon";
Array var list:number[] = [1, 2, 3];
Enum
enum Color {Red, Green, Blue};

var c: Color = Color.Green;

Any var unknownType: any = 4;
Void
function NoReturnType(): void {

}

### Question 10. How Typescript Is Optionally Statically Typed Language?

* Answer :

TypeScript is referred as optionally statically typed, which means you can ask the compiler to ignore the type of a variable. Using any data type, we can assign any type of value to the variable. TypeScript will not give any error checking during compilation.

var unknownType: any = 4;
unknownType = "Okay, I am a string";
unknownType = false; // A boolean.

### Question 11. What Are Modules In Typescript?

* Answer :

Modules are the way to organize code in TypeScript. Modules don’t have any features, but can contain classes and interfaces. It is same like namespace in C#.

### Question 12. What Are Classes In Typescript?

* Answer :

The concept of classes is very similar to .NET/Java. A Class can have constructor, member variables, properties and methods. TypeScript also allows access modifiers “private” and “public” for member variables and functions.

### Question 13. How Do You Implement Inheritance In Typescript?

* Answer :

Using extends keyword, we can implement inheritance.

class Animal {
    public domestic:boolean;
    constructor(public name: string) { }
}

class Cat extends Animal {
    constructor(name: string, domestic: boolean) 
    { 
      super(name); 
      this.domestic = true;
    }
}

class Tiger extends Animal {
    constructor(name: string, domestic: boolean) 
    { 
      super(name); 
      this.domestic = false;
    }
}

### Question 14. How To Call Base Class Constructor From Child Class In Typescript?

* Answer :

Using super(), we can call base class constructor, as seen in the above code.

### Question 15. What Is The Default Access Modifier For Members Of A Class In Typescript?

* Answer :

In TypeScript, each member of class is public by default.

### Question 16. How Can You Allow Classes Defined In A Module To Be Accessible Outside Of The Module?

* Answer :

Classed define in a module are available within the module. Outside the module, you can’t access them.

module Vehicle {
    class Car {
        constructor (
            public make: string, 
            public model: string) { }
    }
    var audiCar = new Car("Audi", "Q7");
}
// This won't work
var fordCar = Vehicle.Car("Ford", "Figo");

As per above code, fordCar variable will give us compile time error. To make classes accessible outside module, use export keyword for classes.

module Vehicle {
    export class Car {
        constructor (
            public make: string, 
            public model: string) { }
    }
    var audiCar = new Car("Audi", "Q7");
}
// This works now
var fordCar = Vehicle.Car("Ford", "Figo");

### Question 17. How Does Typescript Support Optional Parameters In Function As In Javascript Every Parameter Is Optional For A Function?

* Answer :

In JavaScript, every parameter is considered optional. If no value is supplied, then it is treated as undefined. So while writing functions in TypeScript, we can make a parameter optional using the “?” after the parameter name.

function Demo(arg1: number, arg2? :number) {
}

So, arg1 is always required and arg2 is an optional parameter. Remember, optional parameters must follow required parameters. If we want to make arg1 optional, instead of arg2, then we need to change the order and arg1 must be put after arg2.

function Demo(arg2: number, arg1? :number) {
}

Similar to optional parameters, default parameters are also supported.

function Demo(arg1: number, arg2 = 4) {
}

### Question 18. Does Typescript Support Function Overloading As Javascript Doesn’t Support Function Overloading?

* Answer :

Yes, TypeScript does support function overloading. But the implementation is odd. When you overload in TypeScript, you only have one implementation with multiple signatures.

class Customer {
    name: string;
    Id: number;

    add(Id: number);
    add(name:string);
    add(value: any) {
    if (value && typeof value == "number") {
        //Do something
    }
    if (value && typeof value == "string") {
        //Do Something
    }
   }
}

The first signature has one parameter of type number whereas the second signature has a parameter of type string. The third function contains the actual implementation and has a parameter of type any. The any data type can take any type of data. The implementation then checks for the type of the supplied parameter and executes a different piece of code based on supplier parameter type.

OR You can also use union type introduced in TypeScript 1.4. Union types let you represent a value which is one of multiple types.

add(a:string|number) {
   //do something
}

Using union type, you can typically remove the need for an overload.

### Question 19. Is It Possible To Debug Any Typescript File?

* Answer :

Yes, it is possible. To debug it, you need .js source map file. If you are new to source map, read more here. So compile the .ts file with the --sourcemap flag to generate a source map file.

tsc -sourcemap file1.ts

This will create file1.js and file1.js.map. And last line of file1.js would be reference of source map file.

//# sourceMappingURL=file1.js.map

### Question 20. What Is Typescript Definition Manager And Why Do You Need It?

* Answer :

TypeScript Definition Manager (TSD) is a package manager to search and install TypeScript definition files directly from the community driven DefinitelyTyped repository. Let’s see with an example.

Suppose, you want to use some jQuery code in your .ts file.

$(document).ready(function() { //Your jQuery code });

And now when you try to compile it using tsc, you will get compile time error Cannot find name “$”. That’s because TypeScript can’t understand what does “$” means. So somehow we need to inform TypeScript compiler that it belongs to jQuery. That’s where TSD comes into play. You can download jQuery Type Definition file and include it in your .ts file. First, install TSD.

npm install tsd -g 

In your typescript directory, create a new typescript project by running:

tsd init

Then install the definition file for jquery.

tsd query jquery --action install

This will download and create a new directory containing your jquery definition file. The definition file ends with “.d.ts”. So now include it by updating your typescript file to point to the jquery definition.

/// 
$(document).ready(function() { //To Do
});

Now try to compile again and this time, js will be generated without any error.

So TSD will help you to get type definition file for required framework. If you wish to use angular, then download angular type definition file.

### Question 21. What Is Typescript Declare Keyword?

* Answer :

It’s quite possible that JavaScript libraries/frameworks don’t have TypeScript definition files and yet you want to use them without any errors. Te solution is to use the declare keyword. The declare keyword is used for ambient declarations where you want to define a variable that may not have originated from a TypeScript file.

declare var unKnownLibrary;

### Question 22. How To Generate Typescript Definition File From Any .ts File?

* Answer :

You can generate TypeScript definition file from any .ts file via tsc compiler. Generating a TypeScript definition will make your TypeScript file reusable.

tsc --declaration file1.ts

### Question 23. What Is Tsconfig.json File?

* Answer :

The presence of a tsconfig.json file in a directory indicates that the directory is the root of a TypeScript project. The tsconfig.json file specifies the root files and the compiler options required to compile the project. And using this file, we can streamline building TypeScript project. Below is a sample tsconfig.json file.

{
   "compilerOptions": {
      "removeComments": true,
      "sourceMap": true
   },
   "files": [
      "main.ts",
      "othermodule.ts"
    ]
}

Within files section, define all the .ts files in the project. And when you invoke tsc without any other arguments with the above file in the current directory, it will compile all the files with the given compiler option settings.

### Question 24. What Are The Disadvantages Of Typescript?

* Answer :

Well, TypeScript is great but there are some disadvantages as well.

TypeScript is just another way to write JavaScript. It doesn’t fix the problems of JavaScript. It just creates an illusion that it does.
One more tool to learn.
TypeScript has dependency on type definition files, if you wish to use any existing JavaScript libraries.
Quality of type definition files is a concern as how can you be sure the definitions are correct?
Frequent releases of new versions JavaScript library is also a pain area. Because if their type definition files are not updated then you can’t use them instantly.
In order to run the application in the browser, a compile step is required to transform TypeScript into JavaScript.
Web developers are using JavaScript from decades and TypeScript doesn’t bring anything new.
To use any third party library, definition file is you need. And not all the third party library have definition file available.