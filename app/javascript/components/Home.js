import React, { Suspense } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom';
const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

function getUsers() {
  return dispatch => {
    dispatch({ type: GET_USERS_REQUEST });
    return fetch('/users')
    .then(res => res.json())
    .then(json => dispatch(getUsersSuccess(json.users)))
    .catch(err => console.log(err))
  }
}

function deleteUser(id) {
  return dispatch => {
    dispatch({ type: DELETE_USER_REQUEST });
    let token = document.querySelector('meta[name="csrf-token"]').content;
    fetch('/users/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      },
      redirect: 'error',
    }).then(resp => {
        console.log(resp)
        dispatch(deleteUserSuccess())
        this.getUsers();
      })
  }
}

export function getUsersSuccess(json) {
  return {
    type: GET_USERS_SUCCESS,
    json
  }  
}

export function deleteUserSuccess() {
  return {
    type: DELETE_USER_SUCCESS
  }  
}

class Home extends React.Component {

  componentDidMount() {
    this.props.getUsers();
  }

  render () {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">User Directory</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/add">Add</Link>
                </li>
              </ul>
              {/* <%= link_to (t 'logout'), destroy_user_session_path, method: :delete, class: 'btn btn-outline-success my-2 my-sm-0' %> */}
              Logout
            </div>
          </nav>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map(item => (
                <tr key={item.id}>
                  <td>{item.id }</td>
                  <td>{item.firstname }</td>
                  <td>{item.lastname }</td>
                  <td>{item.username }</td>
                  <td>{item.email }</td>
                  <td>{item.age }</td>
                  <td>
                    <Link to={{ pathname: `/view/${item.id}` }}> View </Link> |
                    <Link to={{ pathname: `/edit/${item.id}` }}> Edit </Link> | 
                    <button className='primary-btn' onClick={() => this.props.deleteUser(item.id) }>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  users: state => state.users
});

const mapDispatchToProps = { getUsers, deleteUser };

export default connect(structuredSelector, mapDispatchToProps)(Home);