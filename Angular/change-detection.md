# Change Detection Strategy

Angular internally uses this concept to detect changes occured on Component.We can set the ChangeDetectionStrategy of our component to ChangeDetectionStrategy.OnPush . This tells Angular that the component only depends on his Inputs ( aka pure ) and needs to be checked in only the following cases:

* The Input reference changes.
* An event occurred from the component or one of his children.
* You run change detection explicitly by calling detectChanges()/tick()/markForCheck() .

```ts

@Component({
  selector: 'my-select',
  template: `
    ...
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

```

# Disable Change Detection
Imagine that you have a component that depends on data that changes constantly, many times per second.

Updating the user interface whenever new data arrives can be expensive. A more efficient way would be to check and update the user interface every X seconds.

We can do that by detaching the component’s change detector and conducting a local check every x seconds.


```js

@Component({
  selector: 'giant-list',
  template: `
    <li *ngFor="let d of dataProvider.data">Data {{d}}</lig>
  `,
})
class GiantList {
  constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 5000);
  }
}

```