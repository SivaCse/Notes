# Data Binding

```ts

btnText: string = 'Add an Item'; 

```

```html

<!-- From: -->
<input type="submit" class="btn" value="Add Item">

<!-- To: -->
<input type="submit" class="btn" [value]="btnText">

<!-- Interpolation -->
<input type="submit" class="btn" value="{{ btnText }}">


<div [style.background-color]="selectedColor">

<div [class.selected]="isSelected">

```

## Two Way data binding

```html

<!-- To: -->
<input type="text" class="txt" name="item" placeholder="Life goal.." [(ngModel)]="goalText">

<br><span>{{ goalText }}</span><br>

```

