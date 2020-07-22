import React from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./Home";
import Add from "./Add";
import Edit from "./Edit";
import View from "./View";
import { withTranslation, Trans } from "react-i18next";
import configureStore from "../store/configureStore";

const store = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'en',
    };
  }

  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang });
    this.props.i18n.changeLanguage(newLang);
  };

  renderRadioButtons = () => {
    return (
      <div>
        <input
          checked={this.state.value === "en"}
          name="language"
          onChange={(e) => this.onLanguageHandle(e)}
          value="en"
          type="radio"
        />
        English &nbsp;
        <input
          name="language"
          value="hi"
          checked={this.state.value === "hi"}
          type="radio"
          onChange={(e) => this.onLanguageHandle(e)}
        />
        Hindi
      </div>
    );
  };
  render() {
    const { t } = this.props;
    return (
      <Provider store={store}>
        <div>
          {this.renderRadioButtons()}
          <Switch>
            <Route exact path="/" render={() => <Home t={t} />}></Route>
            <Route exact path="/add" render={() => <Add t={t} />}></Route>
            <Route
              exact
              path="/edit/:id"
              render={(props) => <Edit {...props} t={t} />}
            ></Route>
            <Route
              exact
              path="/view/:id"
              render={(props) => <View {...props} t={t} />}
            ></Route>
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default withTranslation()(App);
