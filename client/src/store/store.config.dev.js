import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk'; //Used for Async opperations
import { commentsReducer } from '../reducers/commentsReducer';
import { loginReducer } from '../reducers/loginReducer';
import { userReducer } from '../reducers/usersReducer';
import { authReducer } from '../reducers/authReducer';
import { reducer as formReducer } from 'redux-form';
import Async from '../middlewares/async'; //custom async option

export const config = ( initialState = {} ) => {

  //mirror of state from original app
  const reducer = combineReducers({
    comments: commentsReducer,
    login: loginReducer,
    users: userReducer,
    form: formReducer,
    auth: authReducer
  });

  // return Createstore function here,
  // this will get fired as soon as config runs
  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(reduxImmutableStateInvariant(), thunk, Async),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

};