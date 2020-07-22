const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
const GET_USER_REQUEST = 'GET_USER_REQUEST';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const SAVE_USER_REQUEST = 'SAVE_USER_REQUEST';
const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export function getUsers() {
  return dispatch => {
    dispatch({ type: GET_USERS_REQUEST });
    return fetch('/users')
    .then(res => res.json())
    .then(json => dispatch(getUsersSuccess(json.users)))
    .catch(err => console.log(err))
  }
}

export function deleteUser(id) {
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
        dispatch(deleteUserSuccess())
        this.getUsers();
      })
  }
}

export function saveUser(data, successFunction) {
  let token = document.querySelector('meta[name="csrf-token"]').content;
  return dispatch => {
    dispatch({ type: SAVE_USER_REQUEST });
    return fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': token
        },
        redirect: 'error',
        body: JSON.stringify(data)
      })
    .then(res => res.json())
    .then(json => {
      if (typeof successFunction === 'function') {
        successFunction(json)
      }
      dispatch(saveUserSuccess());
    })
    .catch(err => console.log(err))
  }
};

export function getUser(id) {
  let url = `/users/${id}/edit`;
  return dispatch => {
    dispatch({ type: GET_USER_REQUEST });
    return fetch(url)
    .then(res => res.json())
    .then(json => dispatch(getUserSuccess(json.user)))
    .catch(err => console.log(err))
  }
}

export function updateUser(id, data, successFunction) {
  let token = document.querySelector('meta[name="csrf-token"]').content;
  let url = `/users/${id}`;
  return dispatch => {
    dispatch({ type: UPDATE_USER_REQUEST });
    return fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': token
        },
        redirect: 'error',
        body: JSON.stringify(data)
      })
    .then(res => res.json())
    .then(json => {
        if (typeof successFunction === 'function') {
          successFunction(json)
        }
        dispatch(updateUserSuccess())
      }
    )
    .catch(err => console.log(err))
  }
};

export function getUserSuccess(json) {
  return {
    type: GET_USER_SUCCESS,
    json
  }
}

function getUsersSuccess(json) {
  return {
    type: GET_USERS_SUCCESS,
    json
  }
}

function deleteUserSuccess() {
  return {
    type: DELETE_USER_SUCCESS
  }
}

function saveUserSuccess(json) {
  return {
    type: SAVE_USER_SUCCESS,
    json
  }
}

function updateUserSuccess(json) {
  return {
    type: UPDATE_USER_SUCCESS,
    json
  }
}
