```js

const _draw = Symbol();
const _size = Symbol();

class Square {
    constructor(size) {
       
        this[_size] = size; 
        this.name = "Square";
    }

    
    [_draw]() {
    console.log('Im Private')
    }

	getData(){
     console.log(this[_size]);
     this[_draw]()
    }

    
}

const s = new Square(10)

```
