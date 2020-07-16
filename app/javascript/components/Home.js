import React from "react"
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

function getUsers() {
  return dispatch => {
    dispatch({ type: GET_USERS_REQUEST });
    return fetch('/users')
    .then(res => res.json())
    .then(json => dispatch(getThingsSuccess(json)))
    .catch(err => console.log(err))
  }
}

export function getThingsSuccess(json) {
  return {
    type: GET_USERS_SUCCESS,
    json
  }  
}

class Home extends React.Component {

  componentDidMount() {
    this.props.getUsers();
  }

  render () {
    const { users } = this.props;
    const usersList = users.map(user => {
      return <li>{user.firstname} - {user.email}</li>
    });
    return (
      // <React.Fragment>
      //   {/* <button onClick={() => this.props.getUsers()}>Show</button>
      //   <br /> */}
      //   { usersList }
      // </React.Fragment>
      // this.props.users.map(item => (
      //   <React.Fragment key={item.id}>
      //     <li>{item.firstname} - {item.email}</li>
      //   </React.Fragment>
      // ))
      <React.Fragment>
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">User Directory</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <Link to="/add">Add</Link>
                </li>
              </ul>
              {/* <%= link_to (t 'logout'), destroy_user_session_path, method: :delete, class: 'btn btn-outline-success my-2 my-sm-0' %> */}
              Logout
            </div>
          </nav>
          <table class='table table-striped'>
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
                    Delete
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

const mapDispatchToProps = { getUsers };

export default connect(structuredSelector, mapDispatchToProps)(Home);

// const mapStateToProps = state => {
//   return {
//     users: state.users
//   };
// };

// const actionCreators = {
//   getUsers
// };

// export default connect(
//   mapStateToProps,
//   actionCreators
// )(Home)
