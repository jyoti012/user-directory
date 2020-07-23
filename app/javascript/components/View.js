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
    const { firstname, lastname, email, username, age, attachment_url } = this.state.users;
    const { t } = this.props;

    return (
      <React.Fragment>
        <h4>{t('details')}</h4>
        <p>
          <label htmlFor="firstname">{t('form.firstname')}: {firstname}</label>
        </p>
        <p>
          <label htmlFor="lastname">{t('form.lastname')}: {lastname}</label>
        </p>
        <p>
          <label htmlFor="username">{t('form.username')}: {username}</label>
        </p>
        <p>
          <label htmlFor="email">{t('form.email')}: {email}</label>
        </p>
          <p>
            <label htmlFor="age">{t("form.profile_picture")}: </label>
            <img src={attachment_url} width='200' height='200'/>
          </p>
        <p>
          <label htmlFor="age">{t('form.age')}: {age}</label>
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
