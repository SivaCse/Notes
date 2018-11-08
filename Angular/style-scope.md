* The styles specified in @Component metadata apply only within the template of that component.

## Special selectors

### :host 

Use the :host pseudo-class selector to target styles in the element that hosts the component (as opposed to targeting elements inside the component's template).

```css

:host {
  display: block;
  border: 1px solid black;
}

```