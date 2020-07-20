import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isEqual } from 'lodash';

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
  return {
    type: GET_USERS_SUCCESS,
    json
  }
}

class Edit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        age: ''
      }
    }
  }

  handleChange = (e, field) => {
    // let newValue = e.target.value;
    let key = e.target.name;
    // this.setState({
    //   [key]: newValue
    // });
    const users = Object.assign({}, this.state.users, {[field]: e.target.value});
    this.setState(Object.assign({}, this.state, {users}));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = { user: this.state.users };
    let token = document.querySelector('meta[name="csrf-token"]').content;
    fetch('/users/70', {
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
  }

  componentDidMount() {
    this.props.getUser();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.users, this.state.users)) {
      this.setState({...this.state, users: nextProps.users});
    }
  }

  render () {
    const { firstname, lastname, email, username, age } = this.state.users;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h4>Edit User Details</h4>
          <p>
            <label htmlFor="firstname">Firstname: </label>
            <input type="text" value={firstname} onChange={(e)=>this.handleChange(e, 'firstname')} />
          </p>
          <p>
            <label htmlFor="lastname">Lastname: </label>
            <input type="text" value={lastname} onChange={(e)=>this.handleChange(e, 'lastname')} />
          </p>
          <p>
            <label htmlFor="username">Username: </label>
            <input type="text" value={username}  onChange={(e)=>this.handleChange(e, 'username')} />
          </p>
          <p>
            <label htmlFor="email">Email: </label>
            <input type="text" value={email} onChange={(e)=>this.handleChange(e, 'email')} />
          </p>
          <p>
            <label htmlFor="age">Age: </label>
            <input type="text" value={age} onChange={(e)=>this.handleChange(e, 'age')} />
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
