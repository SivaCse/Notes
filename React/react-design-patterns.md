# Advanced React Patterns tutorial

This is the tasks and assignments for the Advanced React Patterns tutorial, held
by @selbekk et al.

You can find the slides associated to this workshop [here](https://slides.com/kristoferselbekk/advanced-react-patterns).

## About this workshop

This workshop aims to introduce some advanced patterns and techniques for 
passing properties and sharing logic across your application. We'll start off 
with some pretty basic stuff, and continue on working through a slew of tasks on 
each topic. It's totally fine if you don't finish all the tasks - we created 
several  extras so that you can continue your learning on your own at your own 
pace.

### Intended audience

This workshop assumes that you know the basics of React, and that you're pretty 
comfortable writing your own components. If you want to brush up on your React 
skills before attending this workshop, I suggest you look through the 
[Beginner's guide to React](https://egghead.io/courses/the-beginner-s-guide-to-react)
by Kent C. Dodds. Don't be put off by the title - even React pros can learn a 
trick or two from watching these 80 minutes of video.

------

## Implicit props

Implicit props are props that are applied to your component without you 
explicitly adding them! They appear out of thin air, and may seem a bit weird. 
In real life, though, they are really useful in certain scenarios.

We're going to start this workshop off by using React's `cloneElement` API to 
inject these implicit props into the children of our components.

### Example

[`React.cloneElement`](https://reactjs.org/docs/react-api.html#cloneelement) is 
a way to clone a React element. We typically use it to apply extra props
to the children passed to our component. Here's an example of how it's used:

```js
const RadioButtonGroup = (props) => (
  <div>
    {React.Children.map(
      props.children, 
      (child) => React.cloneElement(child, { name: props.name }),
    )}
  </div>
);
```

Here, we loop over all the children (`React.Children.map`), and pass the `name` 
prop from `RadioButtonGroup` to each child. This way, we don't have to pass this 
prop to each child manually!

```js
<RadioButtonGroup name="choice">
  <input type="radio" value="red" />
  <input type="radio" value="blue" />
  <input type="radio" value="green" />
</RadioButtonGroup>
```

This saves us from a bit of repetition!

### Tasks

#### Pass a property to the children

Create a component that passes a property "name" with your own name to its 
children.

[Do your work here](https://codesandbox.io/s/pj1n817mkj)

#### Make all the elements red!

We've all solved CSS problems by applying a red border to elements, one by one, 
until we've found the one that's acting up. Just for funs, create a component 
that applies a red border to all its children.

[Do your work here](https://codesandbox.io/s/92wj5yvny)

#### Who's going to win?

What happens when you pass in children that already have a prop with the same 
name as you're trying to overwrite? Let's find out!

Create a component that applies a class of "clone-element-class" to its 
children. Also make sure to pass in children with the "original-class" class.
Which one wins? Can you make a component that lets you apply the 
`clone-element-class` _and_ the `original-class` class to the children?

[Do your work here](https://codesandbox.io/s/186xp98847)

#### Create an input group component (ID + aria-invalid)

Another similar component to the `RadioButtonGroup` could be a component that 
lets you add a label and an error message to your component. We've created the 
outline to such a component in the sandbox below. 

To make sure our component is accessible, the child needs a unique ID and an 
aria-tag indicating whether or not it's invalid. Propagate two props - a unique
`id` string and `aria-invalid`, which should be either `"true"` or `"false"` 
depending on whether the `error` prop is set or not.

[Do your work here](https://codesandbox.io/s/3q82r69qp)

### Summary

Using `cloneElement` is great for when you know you'll only have a single type 
of children, or if you just have really simple component structures.

When you need more flexibility or access to lifecycle methods, you might want 
to consider other options.

## Higher order components

Higher order components is a powerful pattern for when you need to access the 
lifecycle methods of React, or simply need to share logic across your 
application.

Higher order components (also known as HOCs) are functions that accept a 
component as input, and returns a new component that potentially renders your 
input with some extra props.

You've probably used HOCs before. `react-redux`' `connect` and `react-router`'s 
`withRouter` are both HOCs that wrap your component and gives it more 
information and capabilities than it did before.

### Example

Here's a simple HOC that provides your component with some hard coded user info:

```js
// First, let's create some fake user info.
const userInfo = { name: 'Kristofer', age: 30 };
const withUserInfo = (TargetComponent) => 
  props => <TargetComponent {...props} {...userInfo} />;
};
```

Here, we create a function that accepts a component, and then returns a _new_ 
component that renders the passed component with the extra `name` and `age` 
props.

You can use it like this:

```js
const Greeting = props => (
  <p>
    Hi {props.name}, you do not look a day over {props.age - 5}!
  </p>
);
const GreetingWithUserInfoAlreadyProvided = withUserInfo(Greeting);
```

### Tasks

#### `withColor`

Let's start off without too much frills. Create an HOC that adds the prop 
`color="yellow"` to the passed component. 

[Do your work here](https://codesandbox.io/s/y3m62kw2wx)

#### `withToggler`

HOCs can return stateful class components as well. The sandbox below has a 
simple outline of a WithToggler component implemented. Pass two props `toggled` 
and `onToggle` down to the wrapped component!

[Do your work here](https://codesandbox.io/s/vmomkwlpnl)

#### `withScreenSize`

Sometimes, you don't want to render something big on small devices. Therefore, 
we need to create an HOC `withScreenSize` that provides two props `screenWidth`
and `screenHeight` to its wrapped component. 

Bonus task: Remember to update the props when the screen size changes!

[Do your work here](https://codesandbox.io/s/o4x27lpj99)

Tip: You get the screen size from `window.screen`.

Tip: Use a debounce function like 
[`lodash/debounce`](https://www.npmjs.com/package/lodash.debounce) to only get
the screen size when it's required.

#### `withDebugLogging`

Do you write a lot of `console.log` statements, even though there's a perfectly 
good debugger available? We too. Create an HOC that wraps your buggy component, 
that logs:

- whenever the wrapped component renders (with timestamp)
- whenever the props change (with the old and new props)

[Do your work here](https://codesandbox.io/s/7o3znxq28j)

##### Bonus task! `withDependencyInjection`

Another neat-o trick you can do with HOC is to provide them with extra props. 
A basic HOC is a function that returns a component - but you can do better than 
that. Create an HOC that accepts curried arguments like this:

```js
withDependencyInjection({ oneDep, anotherDep })(MyComponent);
```

Or, in plain English, a function that returns a function that returns a function
that renders a component you passed in. :mind_blown: Who said functional 
programming wasn't fun?

It's not all too bad though. It's basically changing this:

```js
TargetComponent => props => <TargetComponent {...} />
```

to this:

```js
someExtraArguments => TargetComponent => props => <TargetComponent {...} />
```

The sandbox below has an outline ready for you to try out!

[Do your work here](https://codesandbox.io/s/8kzpooxm60)

### Summary

Higher order components are powerful tools that lets you do basically whatever 
you want - as long as you want to apply any extra props etc directly to your 
passed component.

If you don't know how your consumer wants to use the data you provide, you might
want to look at other alternatives.

## Render props

The concept of "render props" is one of the most powerful patterns in React. It 
lets you harness the powers of HOCs, while at the same time retain the freedom 
you apply that power wherever you want.

"Render props" is the act of returning the result of calling a prop in your 
component's `render` method. 

```js
<MyRenderPropComponent
  render={magicProps => (
    <div>{magicProps.someData}</div>
  )}
/>
```

That render prop could be called whatever you want - even 
`children`. Since the `children` prop is handled a bit differently in JSX than 
the rest, this lets you pass in a function as children to your component:

```js
<MyRenderPropComponent>
  {magicProps => (
    <div>{magicProps.someData}</div>
  )}
</MyRenderPropComponent>
```

Woah!

### Example

The great thing about render props, is that they look a bit fancy, but they're 
dead easy to create! Here's an example that always passes the render timestamp 
as an argument to its child-function:

```js
const Timestamper = props => {
  const timestamp = Date.now();
  return props.children(timestamp);
};
```

See? All it does it call `children` as a function, and pass some (optional) data 
to it. 

You use it like this:

```js
<Timestamper>
  {timestamp => (
    <p>{timestamp} is an {timestamp % 2 === 0 ? 'even' : 'odd'} number</p>
  )}
</Timestamper>
```

### Tasks

#### My first render prop

Create a component that accepts a function as a `render` prop, 
and that returns the result of calling that function in its render method.

[Do your work here](https://codesandbox.io/s/zkmvo501m3)

#### Function as child

Using the `render` prop is fine - but how about renaming the `render` prop to 
`children`? Refactor your code and see how you can pass your function as a 
regular children prop.

[Do your work here](https://codesandbox.io/s/p5rl78v2r7)

#### Re-implement the input group with render props

Remember the `InputGroup` component from the `cloneElement` tasks? Re-implement 
this component with render props! Pass the `id` and `aria-invalid` props as an 
argument object, so the user can apply them wherever they want!

[Do your work here](https://codesandbox.io/s/xrn96k4zqz)

#### Re-implement the toggle container with render props

You can implement any HOC with render props too. Re-implement the toggle 
container task you did in the HOC task above, with a render prop.

[Do your work here](https://codesandbox.io/s/9z809oj14w)

### Summary

Render props are powerful, and lets you share logic across your application with 
ease. They aren't always required, though, and the syntax can be a bit verbose. 
The moral of the story is "use when required".

## Context

Passing logic between components is now a breeze - right? Well, you almost know
all of the secrets! There's one more challenge to conquer though - and that's 
React's `context` API.

Every so often, you end up passing props from one component several layers down 
without using it at all. This is what we refer to as "prop drilling", and is a 
pain a lot of React developers deal with.

Context is a workaround for this. It lets you pass any value from any top 
component to any component further down the component tree without passing it 
through the intermediate "layers". 

Like HOCs, you've probably used context before - although not directly. The way 
you get access to the Redux store, or React Router's `history` object and route 
information, is through context. You use an HOC or a component to access the 
context, so you typically don't notice it at all!

### Example

First, we use the new `React.createContext` API to create two new components - 
a `Provider` and a `Consumer`. The `Provider` accepts a `value`, and the 
`Consumer` can access this value through a render prop.

Here is a simple example:

```js
const { Provider, Consumer } = React.createContext();

<Provider value="42">
  <LotsOfOtherComponents>
    <Consumer>
      {value => (
        <p>The answer to life, the universe and everything is {value}</p>
      )}
    </Consumer>
  </LotsOfOtherComponents>
</Provider>
```

Basically, the value you pass to provider will show up as the argument to the 
`Consumer` component's render prop function. This might look like a bit "much" 
here, but when `<Provider />` is at the root of your app, and `<Consumer />` is 
seven layers of components further down - this saves you a lot of time!

#### Tasks

##### Creating a theme context

Let's get you started with your very own context! Create a 
context with React's `createContext` function, and destructure out its two 
`Provider` and `Consumer` members.

[Do your work here](https://codesandbox.io/s/48o3zjmrj9)

##### (cont) Providing context

To use a provider, it usually makes sense to keep the data you want to provide 
in component state. Create a component that keeps your theme name in state 
(let's default it to 'light'), and pass that value into the `Provider`'s `value`
prop.

Make sure your component also renders `props.children`, so that you can wrap 
your app in it!

[Do your work here](https://codesandbox.io/s/l97wpnx42z)

##### Consuming context

So you've created a theme provider component, and now you want access to this 
theme? Great, let's start consuming it!

In the sandbox below, we've created an app with a provider and a few components
between it and where you want your context. Import and use your consumer 
component directly!

[Do your work here](https://codesandbox.io/s/m5lkmxpj6p)

##### Updating the theme

A single theme doesn't make much sense. To alleave this, we're going to pass a 
callback down alongside our `theme` context prop. We do this by passing an 
object down as the provided `value` prop, with two keys: `theme` and 
`changeTheme`.

Rebase your code to pass an object as context, and add a `changeTheme` callback
that updates your theme. Remember - that value is in your provider's state, so 
you're probably going to want something that calls `this.setState` somewhere!

[Do your work here](https://codesandbox.io/s/zw7j37x42p)

##### Bonus task: Internationalization

Our startup is blowing up in Germany! We need internationalization support right
away!

We hired a real German to translate our texts, so you'll find them in the 
provided sandbox. Your job is to provide these texts through context!

If you have the time, also add support for changing the language!

[Do your work here](https://codesandbox.io/s/1o20nr4vr7)

### Summary

Context works as a "wormhole" for props, letting you pass props from the top of 
the tree to any place below it without passing it through intermediary 
components. It's great when you work with deep component trees, or if you have 
application global state or content that you need to provide to your components.

Context also comes with the downside of a slightly verbose API. Sometimes it's 
just easier and more readable to just pass the prop a level or two. That's up to 
you - the developer - to decide

## Further reading

If you found these topics interesting, and want to learn more, there are some 
resources you can look into to further continue your learning.

- [Kent C. Dodds' course on advanced React](https://blog.kentcdodds.com/advanced-react-component-patterns-56af2b74bc5f)
- [Max Stoiber's deep dive on children in React](https://mxstbr.blog/2017/02/react-children-deepdive/)
- [The React docs on React.cloneElement()](https://reactjs.org/docs/react-api.html#cloneelement)
- [The React docs on HOCs](https://reactjs.org/docs/higher-order-components.html)
- [The React docs on render props](https://reactjs.org/docs/render-props.html)
- [The React docs on context](https://reactjs.org/docs/context.html)

## Thanks!

Thanks for spending your time working through these tasks!