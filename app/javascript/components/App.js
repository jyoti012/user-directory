import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from  'react-redux';
import Home from './Home'
import Add from './Add'
import Edit from './Edit'
import View from './View'
import { withTranslation, Trans } from 'react-i18next'
import configureStore from '../store/configureStore';

const store = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        value: "en"
    }
 }

 onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({value: newLang})
    this.props.i18n.changeLanguage(newLang)
  }

  renderRadioButtons = () => {
    return (
      <div><input
      checked={this.state.value === 'en'}
      name="language" onChange={(e) => this.onLanguageHandle(e)} value="en" type="radio" />English &nbsp;
      <input name="language" value="jp"
      checked={this.state.value === 'jp'}
      type="radio" onChange={(e) => this.onLanguageHandle(e)} />Japanese</div>
    )
  }
  render () {
    const {t} = this.props
    return (
      <Provider store={store}>
        <div>
        {t("author.title")}
        { this.renderRadioButtons() }
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

export default withTranslation()(App)
