export default function rootReducer (state, action) {
  switch (action.type) {
    case 'GET_USERS_SUCCESS':
      return {
          users: action.json
      }
    case 'GET_USER_SUCCESS':
      return {
          users: action.json
      }
    default:
      return state;
  }
}
