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
      },
      error: '',
      successMessage: ''
    }
    this.saveUserSuccess = this.saveUserSuccess.bind(this);
  }

  handleChange = (e, field) => {
    const users = Object.assign({}, this.state.users, {[field]: e.target.value});
    this.setState(Object.assign({}, this.state, {users}));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = { user: this.state.users };
    this.props.updateUser(this.props.users.id, data, this.saveUserSuccess)
  }

  saveUserSuccess(res) {
    const { t } = this.props;
    if (res.status === 'success') {
      this.setState({
        error: '',
        successMessage: t('form.update_success')
      })
    } else {
      this.setState({
        error: res,
        successMessage: ''
      })
    }
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
    const { t } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h4>{t('form.edit_user')} {t('details')}</h4>
            {this.state.error && this.showFormErrors()}
            <h5>{this.state.successMessage}</h5>
          <p>
            <label htmlFor="firstname">{t('form.firstname')}: </label>
            <input type="text" value={firstname} onChange={(e)=>this.handleChange(e, 'firstname')} />
          </p>
          <p>
            <label htmlFor="lastname">{t('form.lastname')}: </label>
            <input type="text" value={lastname} onChange={(e)=>this.handleChange(e, 'lastname')} />
          </p>
          <p>
            <label htmlFor="username">{t('form.username')}: </label>
            <input type="text" value={username}  onChange={(e)=>this.handleChange(e, 'username')} />
          </p>
          <p>
            <label htmlFor="email">{t('form.email')}: </label>
            <input type="text" value={email} onChange={(e)=>this.handleChange(e, 'email')} />
          </p>
          <p>
            <label htmlFor="age">{t('form.age')}: </label>
            <input type="text" value={age} onChange={(e)=>this.handleChange(e, 'age')} />
          </p>
          <input type="submit" value={t('form.edit')} />
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
