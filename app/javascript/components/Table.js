import React from 'react';
import { Link } from 'react-router-dom';

class Table extends React.Component {

  componentDidMount() {
    this.props.getUsers();
  }

  render () {
    const { t } = this.props;
    return (
      <React.Fragment>
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
          </table>) :
          t('form.no_users')
        }
      </React.Fragment>
    );
  }
}

export default Table;
