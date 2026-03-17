import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import recipeReducer from './recipeReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  recipes: recipeReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
