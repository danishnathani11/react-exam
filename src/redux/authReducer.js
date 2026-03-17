import * as types from './actionTypes';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  isAuthenticated: !!localStorage.getItem('user'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case types.LOGOUT_USER:
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default authReducer;
