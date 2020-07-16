import React, { Component } from 'react';

class Add extends Component {

  state = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    age: ''
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
    let token = document.querySelector('meta[name="csrf-token"]').content;
    fetch('/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      },
      redirect: "error",
      body: JSON.stringify(data)
    })
      .then(resp => {
        resp.json()
      })
      .then(post => {
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h4>Add User Details</h4>
        <p>
          <label htmlFor="firstname">Firstname: </label>
          <input type="text" name="firstname" onChange={this.handleChange} />
        </p>
        <p>
          <label htmlFor="lastname">Lastname: </label>
          <input type="text" name="lastname" onChange={this.handleChange} />
        </p>
        <p>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" onChange={this.handleChange} />
        </p>
        <p>
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" onChange={this.handleChange} />
        </p>
        <p>
          <label htmlFor="age">Age: </label>
          <input type="text" name="age" onChange={this.handleChange} />
        </p>

        <input type="submit" value="Add User" />
      </form>
    )
  }
}

export default Add