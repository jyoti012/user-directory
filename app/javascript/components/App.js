import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from  'react-redux';
import Home from './Home'
import Add from './Add'
import Edit from './Edit'
import View from './View'
import configureStore from '../store/configureStore';

const store = configureStore();

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <Switch>
            <Route exact path='/' render={() => <Home/>} ></Route>
            <Route exact path='/add' render={() => <Add/>} ></Route>
            <Route exact path='/edit/:id' render={(props) => <Edit {...props}/>} ></Route>
            <Route exact path='/view/:id' render={(props) => <View {...props}/>} ></Route>
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App
