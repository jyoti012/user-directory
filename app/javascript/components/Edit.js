import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isEqual } from 'lodash';
import { getUser, updateUser } from '../actions/users';

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
    const users = Object.assign({}, this.state.users, {[field]: e.target.value});
    this.setState(Object.assign({}, this.state, {users}));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = { user: this.state.users };
    this.props.updateUser(this.props.users.id, data)
    location.reload()
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

const mapDispatchToProps = { getUser, updateUser };

export default connect(structuredSelector, mapDispatchToProps)(Edit);
