# Events

## Example

```js

let button = document.querySelector("button");
  function once() {
    console.log("Done.");
    button.removeEventListener("click", once);
  }
  button.addEventListener("click", once);

```

### Prevent Default Behaviour

to stop an event doing what it does by default

```js
form.onsubmit = function(e) {
  if (fname.value === '' || lname.value === '') {
    e.preventDefault();
    para.textContent = 'You need to fill in both names!';
  }
}

```

### Event bubbling and capture

Event bubbling and capture are two mechanisms that describe what happens when two
handlers of the same event type are activated on one element. Fixing the problem with stopPropagation()

### Event Delegation

Event delegation allows you to avoid adding event listeners to specific nodes;  instead, the event listener is added to one parent.

```js
document.getElementById("elementId").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if(e.target && e.target.nodeName == "LI") {
		// List item found!  Output the ID!
		console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
	}
});

```
