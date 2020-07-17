import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const GET_USER_REQUEST = 'GET_USER_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

function getUser() {
  return dispatch => {
    dispatch({ type: GET_USER_REQUEST });
    return fetch('/users/70/edit')
    .then(res => res.json())
    .then(json => dispatch(getUserSuccess(json.user)))
    .catch(err => console.log(err))
  }
}

export function getUserSuccess(json) {
  console.log('getUserSuccess', json);
  return {
    type: GET_USERS_SUCCESS,
    json
  }  
}

class Edit extends React.Component {

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
      method: 'PUT',
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

  componentDidMount() {
    this.props.getUser();
  }

  render () {
    console.log('render', this.props);
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h4>Edit User Details</h4>
          <p>
            <label htmlFor="firstname">Firstname: </label>
            <input type="text" name="firstname" value={this.props.users.firstname} onChange={this.handleChange} />
          </p>
          <p>
            <label htmlFor="lastname">Lastname: </label>
            <input type="text" name="lastname" value={this.props.users.lastname} onChange={this.handleChange} />
          </p>
          <p>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" value={this.props.users.username} onChange={this.handleChange} />
          </p>
          <p>
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" value={this.props.users.email} onChange={this.handleChange} />
          </p>
          <p>
            <label htmlFor="age">Age: </label>
            <input type="text" value={this.props.users.age} name="age" onChange={this.handleChange} />
          </p>

          <input type="submit" value="Edit User" />
        </form>
      </React.Fragment>
    );
  }
}


const structuredSelector = createStructuredSelector({
  users: state => state.users
});

const mapDispatchToProps = { getUser };

export default connect(structuredSelector, mapDispatchToProps)(Edit);