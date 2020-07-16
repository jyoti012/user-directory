import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  users: []
}

function rootReducer (state, action) {
  switch (action.type) {
    case 'GET_USERS_SUCCESS':
      return {
          users: action.json.users
      }
    default:
      return state;
  }
}

export default function configureStore() {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return store;
}