import React, { Suspense } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../actions/users';

class Home extends React.Component {

  componentDidMount() {
    this.props.getUsers();
  }

  render () {
    const { t } = this.props;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">{t('title')}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/add">{t('form.add')}</Link>
                </li>
              </ul>
              {/* <%= link_to (t 'logout'), destroy_user_session_path, method: :delete, class: 'btn btn-outline-success my-2 my-sm-0' %> */}
              // {t('logout')}
            </div>
          </nav>
          {this.props.users.length ? (
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope="col">{t('form.id')}</th>
                  <th scope="col">{t('form.firstname')}</th>
                  <th scope="col">{t('form.lastname')}</th>
                  <th scope="col">{t('form.username')}</th>
                  <th scope="col">{t('form.email')}</th>
                  <th scope="col">{t('form.age')}</th>
                  <th scope="col">{t('form.action')}</th>
                </tr>
              </thead>
              <tbody>
                { this.props.users.map(item => (
                  <tr key={item.id}>
                    <td>{item.id }</td>
                    <td>{item.firstname }</td>
                    <td>{item.lastname }</td>
                    <td>{item.username }</td>
                    <td>{item.email }</td>
                    <td>{item.age }</td>
                    <td>
                      <Link to={{ pathname: `/view/${item.id}`, query: {id: item.id} }}> {t('form.view')} </Link> |
                      <Link to={{ pathname: `/edit/${item.id}`, query: {id: item.id} }}> {t('form.edit')} </Link> |
                      <button className='primary-btn' onClick={() => this.props.deleteUser(item.id) }>{t('form.delete.title')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>) : t('form.no_users')}
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
