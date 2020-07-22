import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { saveUser } from '../actions/users';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      age: ''
    }
  }

  handleChange = e => {
    let newValue = e.target.value;
    let key = e.target.name;
    this.setState({
      [key]: newValue
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = { user: this.state };
    this.props.saveUser(data);
  }

  render() {
    const {t} = this.props
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h4>{t("form.add")}</h4>
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

export default connect(structuredSelector, mapDispatchToProps)(Add);
