# React Context

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

// App.jsx

```js

import React from "react";

import Provider, { Consumer } from "./Context";

const App = () => (
  <Provider>
    <Consumer>
      {({ count }) => {
        return (
          <div>
            <span>{count}</span>
            <br />
          </div>
        );
      }}
    </Consumer>
    <div>
      <div>
        <Consumer>
          {({ increment, decrement }) => {
            return (
              <div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
              </div>
            );
          }}
        </Consumer>
      </div>
    </div>
  </Provider>
);

export default App;

```

//Context.jsx

```js

import React, { Component } from "react";
const Context = React.createContext();

class Provider extends Component {
  state = {
    count: 0
  };
  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  decrement = () => {
    this.setState({
      count: this.state.count - 1
    });
  };
  render() {
    return (
      <Context.Provider
        value={{
          count: this.state.count,
          increment: this.increment,
          decrement: this.decrement
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
const Consumer = Context.Consumer;

export { Consumer };

export default Provider;

```