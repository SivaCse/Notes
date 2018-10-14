# Angular Design Patterns


### Singleton Example

```ts
@Injectable()
export class FacadeService {
  
  private _accountService: AccountService;
  public get accountService(): AccountService {
    if(!this._accountService){
      this._accountService = this.injector.get(AccountService);
    }
    return this._accountService;
  }
  
  constructor(private injector: Injector) {  }

  getOrderList() {
    return this.accountService.getOrderList();
  }
  getAddress() {
    return this.accountService.getAddress();
  }
}

```

### Smart Dump Components Pattern

* Seperate logic such as data access, modify state from components and create a container component
* Pass data through @Input and retrieve events through @output
* for deep nested level data retrieval use Behaviour Subject instead @Output to prevent event emitted related issues.
```ts
// BehaviorSubject Example
@Injectable()
export class LessonSelectedService {

    private _selected: BehaviorSubject<Lesson> = new BehaviorSubject(null);

    public selected$ = this._selected.asObservable().filter(lesson => !!lesson);
    
    
    select(lesson:Lesson) {
         this._selected.next(lesson);
    }

}

```
