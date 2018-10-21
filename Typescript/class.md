# Class 

```ts

enum Editor {
    MARVEL,
    DC
}

class SuperHero {

    readonly name:string;

    constructor(
        name:string,
        public editor:Editor,
        public creationYear: number) {
        this.name = name;
    }
}


const superman = new SuperHero('Superman',Editor.DC, 1938);

superman.name = 'Spiderman';

console.log(`
    Super hero: 
    ${superman.name} 
    ${Editor[superman.editor]} 
    ${superman.creationYear}
`);

console.log("Superman",superman);

```

# Inheritance Example

```ts

enum Editor {
    MARVEL,
    DC
}


class SuperHero {

    readonly name:string;

    constructor(
        name:string,
        public editor:Editor,
        public creationYear: number) {
        this.name = name;
    }

    createMessage() {
        return `
            Super hero: 
            ${this.name} 
            ${Editor[this.editor]} 
            ${this.creationYear}
        `;
    }

}

class FlyingHero extends SuperHero {

    fly(message:string) {
        console.log(message);
    }
}

const greenLantern = new FlyingHero('Silver Age Green Lantern', Editor.DC, 1959);

console.log(greenLantern.createMessage());

const superman = new FlyingHero('Superman',Editor.DC, 1938);

superman.fly('Up and Away !');

```

# Abstract Example

```ts

enum Editor {
    MARVEL,
    DC
}


abstract class SuperHero {

    readonly name:string;

    constructor(
        name:string,
        public editor:Editor,
        protected creationYear: number) {
        this.name = name;
    }

    abstract createMessage():string;

}

class FlyingHero extends SuperHero {

    fly(message:string) {
        console.log(message + this.creationYear);
    }

    createMessage() {
        return `
            Flying Hero: 
            ${this.name} 
            ${Editor[this.editor]} 
            ${this.creationYear}
        `;
    }
}

const greenLantern = new FlyingHero('Silver Age Green Lantern', Editor.DC, 1959);

console.log(greenLantern.createMessage());

const superman = new FlyingHero('Superman',Editor.DC, 1938);

```

# Implements

```ts

enum Editor {
    MARVEL,
    DC
}

interface Hero {
    name:string;
    creationYear:number;
}

const batman:Hero = {
    name: "Batman",
    creationYear: 1939
};

abstract class SuperHero implements Hero {

    private static readonly LABEL = 'Hero:';

    readonly name:string;

    constructor(
        name:string,
        public _editor:Editor,
        public creationYear: number) {
        this.name = name;
    }

    static createMessage(hero:SuperHero):string {
        return `
            ${SuperHero.LABEL} 
            ${hero.name} 
            ${Editor[hero._editor]} 
            ${hero.creationYear}
        `;
    }

}

interface CanFly {
    fly(message:string):void;
}



class FlyingHero extends SuperHero implements CanFly {

    fly(message:string) {
        console.log(message + this.creationYear);
    }

}


const superman = new FlyingHero('Superman',Editor.MARVEL, 1938);

console.log(superman.fly('Up and Away !'));

```