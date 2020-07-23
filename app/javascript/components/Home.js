import React, { lazy, Suspense } from "react";
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../actions/users';

const Table = lazy(() => import('./Table'));

class Home extends React.Component {

  componentDidMount() {
    this.props.getUsers();
  }

  render () {
    const { t } = this.props;
    return (
      <Suspense fallback={<h1>{t('loading')}</h1>}>
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
            </div>
          </nav>
          <Table users={this.props.users} deleteUser={this.props.deleteUser} getUsers={this.props.getUsers} t={t} />
        </div>
      </Suspense>
    );
  }
}

const structuredSelector = createStructuredSelector({
  users: state => state.users
});

const mapDispatchToProps = { getUsers, deleteUser };

export default connect(structuredSelector, mapDispatchToProps)(Home);
