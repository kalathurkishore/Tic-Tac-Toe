import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import * as serviceWorker from './serviceWorker';
import Game from './components/Game';
import Home from './components/Home'
import firebaseConfig from './firebaseconfig'
import reducer from './reducer'
import firebase from 'firebase'

firebase.initializeApp(firebaseConfig)
const store= createStore(reducer)

const routes= (
  <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/game/:token' component={Game} />
  </BrowserRouter>
)

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register()