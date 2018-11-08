## ngOnChanges()	
Respond when Angular (re)sets data-bound input properties. The method receives a SimpleChanges object of current and previous property values.

Called before ngOnInit() and whenever one or more data-bound input properties change.
```ts
    ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
        let chng = changes[propName];
        let cur  = JSON.stringify(chng.currentValue);
        let prev = JSON.stringify(chng.previousValue);
        this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
    }

```    

## ngOnInit()	
Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties.

Called once, after the first ngOnChanges().

    OnInit()
    Use ngOnInit() for two main reasons:

    To perform complex initializations shortly after construction.
    To set up the component after Angular sets the input properties.

    The ngOnChanges() method is your first opportunity to access those properties. Angular calls ngOnChanges() before ngOnInit() and many times after that. It only calls ngOnInit() once.

## ngDoCheck()	
Detect and act upon changes that Angular can't or won't detect on its own.

Called during every change detection run, immediately after ngOnChanges() and ngOnInit().

ngAfterContentInit()	
Respond after Angular projects external content into the component's view / the view that a directive is in.

Called once after the first ngDoCheck().

ngAfterContentChecked()	
Respond after Angular checks the content projected into the directive/component.

Called after the ngAfterContentInit() and every subsequent ngDoCheck().

ngAfterViewInit()	
Respond after Angular initializes the component's views and child views / the view that a directive is in.

Called once after the first ngAfterContentChecked().

ngAfterViewChecked()	
Respond after Angular checks the component's views and child views / the view that a directive is in.

Called after the ngAfterViewInit and every subsequent ngAfterContentChecked().

ngOnDestroy()	
Cleanup just before Angular destroys the directive/component. Unsubscribe Observables and detach event handlers to avoid memory leaks.

Called just before Angular destroys the directive/component.
