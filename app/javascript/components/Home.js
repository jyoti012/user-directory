import React from "react"
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

function getUsers() {
  return dispatch => {
    dispatch({ type: GET_USERS_REQUEST });
    return fetch(`users.json`)
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
      this.props.users.map(item => (
        <React.Fragment key={item.id}>
          <li>{item.firstname} - {item.email}</li>
        </React.Fragment>
      ))
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
