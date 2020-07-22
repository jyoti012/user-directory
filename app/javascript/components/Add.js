import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { saveUser } from '../actions/users';
import { withRouter } from "react-router-dom";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        age: ''
      },
      error: ''
    }
    this.saveUserSuccess = this.saveUserSuccess.bind(this);
  }

  handleChange = e => {
    const users = Object.assign({}, this.state.users, {[e.target.name]: e.target.value});
    this.setState(Object.assign({}, this.state, {users}));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = { user: this.state.users };
    this.props.saveUser(data, this.saveUserSuccess);
  }

  saveUserSuccess(res) {
    if (res.status === 'success') {
      this.props.history.push('/')
    }
    this.setState({
      error: res
    })
  }

  showFormErrors = () => {
    const {t} = this.props
      return (
        <div style={{color: 'red'}}>
          {t('error.unable_to_save')}
          {
           Object.keys(this.state.error.errors).map(key =>
              (<ul key={key}>
                <li value={key}>
                  <p>{key}</p>
                  {
                    this.state.error.errors[key].map((value, i) =>
                      <p key={i}>{i + 1}. {value}</p>
                    )
                  }
                </li>
              </ul>)
            )
          }
        </div>
      )
  }

  render() {
    const {t} = this.props
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h4>{t("form.add")}</h4>
        {this.state.error && this.showFormErrors()}
        <p>
          <label htmlFor="firstname">{t("form.firstname")}: </label>
          <input type="text" name="firstname" onChange={this.handleChange} />
        </p>
        <p>
          <label htmlFor="lastname">{t("form.lastname")}: </label>
          <input type="text" name="lastname" onChange={this.handleChange} />
        </p>
        <p>
          <label htmlFor="username">{t("form.username")}: </label>
          <input type="text" name="username" onChange={this.handleChange} />
        </p>
        <p>
          <label htmlFor="email">{t("form.email")}: </label>
          <input type="text" name="email" onChange={this.handleChange} />
        </p>
        <p>
          <label htmlFor="age">{t("form.age")}: </label>
          <input type="text" name="age" onChange={this.handleChange} />
        </p>
        <input type="submit" value={t("form.add")} />
      </form>
    )
  }
}
const structuredSelector = createStructuredSelector({});

const mapDispatchToProps = { saveUser };

export default connect(structuredSelector, mapDispatchToProps)(withRouter(Add));
