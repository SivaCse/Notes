//Example 1

import { createStore  } from 'redux';

// Action type
const GREETING = 'GREETING';

// Action Creator
const sayGreeting = (message)=>({type:GREETING,message});


// Reducer

const intialState = [];
const greetingReducer = (state=intialState, action) => {
  switch (action.type) {
    case GREETING:
        return [...state,action.message];
      break;
    default:
      return state;
  }
}

// store

const store = createStore(greetingReducer);


// UI

setTimeout(()=>{
  store.dispatch(sayGreeting('Good Morning'));
  store.dispatch({type:GREETING,message:"Good Morning Raw"}); // not recommended
},2000)

store.subscribe(()=>console.log(' Store is now ',store.getState()));








// Example 2

import { createStore, combineReducers  } from 'redux';

// Action type
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';

// Action Creator
const addition = (a,b)=>({type:ADD,a,b});
const subtraction = (a,b)=>({type:SUBTRACT,a,b});


// Reducer

const intialState = 0;
const addReducer = (state=intialState, action) => {
  switch (action.type) {
    case ADD:
        return action.a+action.b;
      break;
    default:
      return state;
  }
}

const subtractReducer = (state=intialState, action) => {
  switch (action.type) {
    case SUBTRACT:
        return action.a-action.b;
      break;
    default:
      return state;
  }
}


const reducers = combineReducers({add:addReducer,subtract:subtractReducer});
// store

const store = createStore(reducers);


// UI

setTimeout(()=>{
  store.dispatch(addition(1,2));
  store.dispatch(subtraction(10,2));
},2000)

store.subscribe(()=>console.log(' Store is now ',store.getState().add));
store.subscribe(()=>console.log(' Store is now ',store.getState().subtract));


// Example 3


import { createStore, combineReducers, applyMiddleware   } from 'redux';

// Action type
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';

// Action Creator
const addition = (a,b)=>({type:ADD,a,b});
const subtraction = (a,b)=>({type:SUBTRACT,a,b});


// Reducer

const intialState = 0;
const addReducer = (state=intialState, action) => {
  switch (action.type) {
    case ADD:
        return action.a+action.b;
      break;
    default:
      return state;
  }
}

const subtractReducer = (state=intialState, action) => {
  switch (action.type) {
    case SUBTRACT:
        return action.a-action.b;
      break;
    default:
      return state;
  }
}


// custom middleware

const  logger = (store) => {
  return next => action => {
    if(action.type===ADD) {
      console.log('store added', store.getState().add)
    }
    next(action)
  }
}

const  addInterceptor = (store) => {
  return next => action => {
    if(action.type===ADD) {
      action.a = action.a+20;
    }
    //console.log('addInterceptor', action)
    next(action)
  }
}


// store
const reducers = combineReducers({add:addReducer,subtract:subtractReducer});

const store = createStore(reducers,applyMiddleware(logger, addInterceptor));


// UI

setTimeout(()=>{
  store.dispatch(addition(1,2));
  store.dispatch(subtraction(10,2));
},2000)

store.subscribe(()=>console.log(' Store is now ',store.getState().add));



// Example 4


import { createStore, combineReducers, applyMiddleware   } from 'redux';
import thunk from 'redux-thunk';

// Action type
const ADD = 'ADD';

// Action Creator
const addition = (a,b)=> {
  return (dispatch) => {
    setTimeout(()=>{
      dispatch({type:ADD,a,b});
    }, 5000)
  }
}


// Reducer

const intialState = 0;
const addReducer = (state=intialState, action) => {
  switch (action.type) {
    case ADD:
        return action.a+action.b;
      break;
    default:
      return state;
  }
}


// store
const reducers = addReducer;

const store = createStore(reducers,applyMiddleware(thunk));


// UI

setTimeout(()=>{
  store.dispatch(addition(1,2));
},2000)

store.subscribe(()=>console.log(' Store is now ',store.getState()));