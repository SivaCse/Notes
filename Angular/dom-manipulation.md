# DOM Manipulation

DOM Manipulation is possible by using following classes. ElementRef, TemplateRef, ViewRef, ComponentRef and ViewContainerRef. @ViewChild and @ViewChildren are two decorators dealing with dom Manipulation.

## Example with @ViewChild

```ts

@Component({
    selector: 'sample',
    template: `
        <span #tref>I am span</span>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild("tref", {read: ElementRef}) tref: ElementRef;

    ngAfterViewInit(): void {
        // outputs `I am span`
        console.log(this.tref.nativeElement.textContent);
    }
}

```

## ElementRef

is used to reference the needed element. but its not a recommended approach instead use Renderer2.

### Why discouraged?

* Security Risk
* creates tight coupling between your application and rendering layers which makes is difficult to run an app on multiple platforms


## TemplateRef

```ts

@Component({
    selector: 'sample',
    template: `
        <ng-template #tpl>
            <span>I am span in template</span>
        </ng-template>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild("tpl") tpl: TemplateRef<any>;

    ngAfterViewInit() {
        let elementRef = this.tpl.elementRef;
        // outputs `template bindings={}`
        console.log(elementRef.nativeElement.textContent);
    }
}

```

## Renderer2 

is a high level abstraction provided by angular to manipulate DOM. mostly it will be used inside Directive to access DOM.

```ts

import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appGoWild]'
})
export class GoWildDirective implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'wild');
  }
}

```

```html

<h1 appGoWild>
  Hello World!
</h1>
<!-- <h1 class="wild">Hello World!</h1> -->

```

## Example 2

createElement()  - Implement this callback to create an instance of the host element.

```ts

constructor(private renderer: Renderer2, private el: ElementRef) {}

ngOnInit() {
  const div = this.renderer.createElement('div');
  const text = this.renderer.createText('Hello world!');

  this.renderer.appendChild(div, text);
  this.renderer.appendChild(this.el.nativeElement, div);
}

```

```html

<article>
  <div>Hello world!</div>
</article>

```

## Example 3

```ts

constructor(private renderer: Renderer2, private el: ElementRef) {}

ngOnInit() {
  this.renderer.setAttribute(this.el.nativeElement, 'aria-hidden', 'true');
}

```

## Example 4

```ts

constructor(private renderer: Renderer2, private el: ElementRef) {}

ngOnInit() {
  this.renderer.removeClass(this.el.nativeElement, 'wild');
}

```

## Example 5

```ts

constructor(private renderer: Renderer2, private el: ElementRef) {}

ngOnInit() {
  this.renderer.setStyle(
    this.el.nativeElement,
    'border-left',
    '2px dashed olive'
  );
}

```

## Example 6

```ts

constructor(private renderer: Renderer2, private el: ElementRef) {}

ngOnInit() {
  this.renderer.removeStyle(this.el.nativeElement, 'border-left');
}

```

## Example 7

```ts

constructor(private renderer: Renderer2, private el: ElementRef) {}

ngOnInit() {
  this.renderer.setProperty(this.el.nativeElement, 'alt', 'Cute alligator');
  this.renderer.setProperty(this.el.nativeElement, 'value', 'Cute alligator');
}


```

## Other Renderer functions

createElement
createComment
createText
appendChild
insertBefore
removeChild
selectRootElement
parentNode
nextSibling
setAttribute
removeAttribute
addClass
removeClass
setStyle
removeStyle
setProperty
setValue
listen