# Custom Type

```ts

type HasName = {
    firstName?:string,
    lastName:string
};

let person: HasName = {
  lastName: 'Bryant'
};

```

# Example 2

```ts

interface MessageCreator {
    (name:string) : string
};


function createHelloMessage(name:string) :string {
    return `Hello, my name is ${name}`;
}

const creator: MessageCreator = createHelloMessage;

const message = creator('Bill');

console.log(message);

```

# Example 3

```ts

type ThreeNames = [string, string, string];

let persons: ThreeNames = ['Kobe','Kareem', 'Shaq'];

let counters: number[] = [0, 1,2];

type PlayerTuple = [string, number];

let tuple: PlayerTuple = ['Kobe', 5];

```