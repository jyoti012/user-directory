import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from  'react-redux';
import Home from './Home'
import Add from './Add'
import Edit from './Edit'
import View from './View'
import configureStore from '../configureStore';
const store = configureStore();

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => <Home/>} ></Route>
            <Route exact path='/add' render={() => <Add/>} ></Route>
            <Route exact path='/edit/:id' render={() => <Edit/>} ></Route>
            <Route exact path='/view/:id' render={() => <View/>} ></Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
