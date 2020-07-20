import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isEqual } from 'lodash';
import { getUser } from '../actions/users';

class View extends React.Component {

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

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.getUser(params.id);
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
          <h4>User Details</h4>
          <p>
            <label htmlFor="firstname">Firstname: {firstname}</label>
          </p>
          <p>
            <label htmlFor="lastname">Lastname: {lastname}</label>
          </p>
          <p>
            <label htmlFor="username">Username: {username}</label>
          </p>
          <p>
            <label htmlFor="email">Email: {email}</label>
          </p>
          <p>
            <label htmlFor="age">Age: {age}</label>
          </p>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  users: state => state.users
});

const mapDispatchToProps = { getUser };

export default connect(structuredSelector, mapDispatchToProps)(View);
