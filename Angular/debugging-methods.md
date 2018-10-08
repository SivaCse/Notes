## .tap()

```js 

const wholeNumbers$ = of(1, 2, 3, 4, 5);
const squareNumbers$ = wholeNumbers$
.pipe(
  tap(num => console.log(`Whole number: ${num}`)),
  map(num => num * num),
  tap(num => console.log(`Square number: ${num}`))
);

```

## json and async pipes

```js
{{ myJsonObject | json }}

{{ myObservableJsonObject$ | async | json }}

```

### conditional breakpoints

### console.log

### debugger