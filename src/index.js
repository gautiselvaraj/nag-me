import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import combainedReducers from './reducers';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

let middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  const { Iterable } = require('immutable');

  const logger = createLogger({
    collapsed: true,
    stateTransformer: state =>
      Iterable.isIterable(state) ? state.toJS() : state
  });

  middlewares.push(logger);
}

let store = createStore(combainedReducers, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
