# Angular Reference

### Components

* represent piece of UI
* its a kind of directive with View
* meta data associated is @Component

##### Code
```js
export class HeroListComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private service: HeroService) { }

  ngOnInit() {
    this.heroes = this.service.getHeroes();
  }

  selectHero(hero: Hero) { this.selectedHero = hero; }
}

```

## difference observable and promise

stream of events - single events

emit multiple values - single value

cancellable - not cancellable

advanced features like retry etc -  no advanced features




## component - directive difference

directive with view -  directive without view

display DOM   - attaching behaviours to DOM

A component is used to break up the application into smaller components. Whereas, Directive is used to design the re-usable components.
Components can be used to define pipes. Whereas, We cannot define pipes using directives.
Components can be present per DOM element. Whereas, Directive is used to add behavior to an existing DOM element.



Purpose of constructor?
----------------------

1) initialize class
2) dependency injection


Reactive forms
  * Creation
  * validation message
  * assign value
  * update value(s)
  * access value
  * form array
  * validation
  * cutom validator asyn or sync
  * change detection

http interceptors
http custom error interfaces

Resolvers
Route guards

deployment
  * lint setup and lint fix
  * remove unwanted exports from 3rd party
  * bundling with --aot
  * tree shaking


Sunday
------

liniting
========

npm i tslint typescript -g

add it into package json

 "lint": "tslint -c tslint.json 'src/**/*.ts'",


in terminal run below cmd

npm run lint

above cmd will show list of errors then fix


----------

Prettier-vscode

Can also be installed using

ext install prettier-vscode
Usage

Using Command Palette (CMD/CTRL + Shift + P)

1. CMD + Shift + P -> Format Document
OR
1. Select the text you want to Prettify
2. CMD + Shift + P -> Format Selection


----------------------------

Need to add code formatter on Save

ctrl+shift p

configure language specific setting


under user settings

"[javascript]": {
        "editor.formatOnSave": true
    },
    "[typescript]": {
        "editor.formatOnSave": true
    }
  

 
husky
=====

npm install husky lint-staged --save-dev

then in package.json

"scripts": {
    ..
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.ts": [
      "tslint",
      "git add"
    ]
  },


  skip linting for some time by 

  git commit -m "commit message "  --no-verify




  ------------

  web server


   npm install http-server -g

   http-server D:/Sivanthi/www/angular5/dist

   



build

npm run build --base-href=/counterfeetnotes/



April Notes
-----------

### Angular Providers

useFactory takes a factory function that is expected to return the value and also can have dependencies (require instances of other providers passed as parameter)

useValue is just the value that is injected as is

useClass expects a type name and Angular creates an instance from the passed type and also resolves and passes constructor parameters to the class if there are any

There is also useExisting which is like an alias for an already registered provider. The use case is to provide the same instance of a provider with different keys.

injection token
```js
import { InjectionToken } from '@angular/core';

export const ContentfulConfigService = new InjectionToken<any>("myConfig");
```

### Design Patterns

* Observable pattern ( Rxjs )
* Centralized state pattern ( redux )
* Presentaional container
* Communicational ( Input and Output Decorators )
* Composition Pattern

Module architecture
===================

Core

* singleton services once per app

```js

/* 3rd party libraries */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/* our own custom services  */
import { SomeSingletonService } from './some-singleton/some-singleton.service';

@NgModule({
  imports: [
    /* 3rd party libraries */
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    /* our own custom services  */
    SomeSingletonService
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

```

///////////////////////////////////////////////////////////////////////////

Shared

* All the “dumb” components and pipes
* don’t import and inject services from core or other features modules
* instead receive data through props

```js

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { MdButtonModule } from '@angular/material';

/* our own custom components */
import { SomeCustomComponent } from './some-custom/some-custom.component';

@NgModule({
  imports: [
    /* angular stuff */
    CommonModule,
    FormsModule,

    /* 3rd party components */
    MdButtonModule,
  ],
  declarations: [
    SomeCustomComponent
  ],
  exports: [
    /* angular stuff */
    CommonModule,
    FormsModule,

    /* 3rd party components */
    MdButtonModule,

    /* our own custom components */
    SomeCustomComponent
  ]
})
export class SharedModule { }

```

//////////////////////////////////////////////////////////////////


Feature

* modules should only import services from CoreModule

* if a feature module dependent one service from another feature module then,
move the service it into core module.


////////////////////////////////////////


input setter
============

..

```js

@Input() set userName(value: string) {
  this.name = 'User Name is'+value
}

```

////////////////////////

Life cycles
==========

```js

ngOnInit()
ngAfterViewInit()
ngOnChanges(changes: SimpleChanges) {
  
}
ngDestroy()

```

////////////////////////////

Dom Handling
============

1) template reference
2) ViewChild()
3) ViewChildren()

///////////////////

create a service
  create a EventEmitter instance
  provide fn and vars

  inject int into components

  add event into parent component

////////////////////////////


```js

rxjs pipe
rxjs of
rxjs catchError

return this.http.get<Student[]>(url)
      .pipe(
        catchError(catchError(error => of(`I caught: ${error}`)))
      );  


```      


////////////////////////

What is the difference between OnChanges and DoCheck in Angular 2?


ngOnChanges() (OnChanges) is called when a value bound to an input has changed so you can run custom code when an input has changed.

Example 

```js

@Input() o = {
    name: 'Siva',
    age: 32
  };

```  

  if name property is only  updated and reference is same, then ngOnchanges cant detect. Docheck can only detect. so onChnages will detect if we change the reference of object 'o'.


ngDoCheck() (DoCheck) is called when change detection runs so you can implement your custom change detection action


ViewChild
---------
used to access dom from component or directive

```js
import {ViewChild, ViewChildren, Component, AfterViewInit...} from '@angular/core';

class TodoAppComponent implements AfterViewInit {
  @ViewChild(TodoInputComponent) inputComponent: TodoInputComponent
  @ViewChildren(TodoComponent) todoComponents: QueryList<TodoComponent>;
  constructor(private todos: TodoList) {}
  ngAfterViewInit() {
    // available here
  }

```

## Different ways of unsubscribing from RxJS Observables with Angular

Solution

Manually unsubscribe from all custom Observables when a component/directive gets destroyed. The best place to unsubscribe is inside functions that handle the OnDestroy lifecycle hook. Some subscriptions like router and http don’t need manual unsubscribe, for the rest of them there are various solutions:

execute unsubscribe over the subscription object
using takeUntil operator
using async pipe



## angular components communication

* Input decorator
* Output decorator with EventEmitter
* ViewChild 
* Shared Services with BehaviourSubject

## immutable js

Advantages
----------
* history states are preserved
* faster performance
* community support

disadvantages
-------------
* syntax may be unfamiliar to some developers
* doesnt work with combineReducers
* may not be able to use rest and spread operators

