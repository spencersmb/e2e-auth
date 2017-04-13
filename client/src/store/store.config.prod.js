import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //Used for Async opperations
import { commentsReducer } from '../reducers/commentsReducer';
import { loginReducer } from '../reducers/loginReducer';
import { userReducer } from '../reducers/usersReducer';
import { reducer as formReducer } from 'redux-form';
import { reducer } from 'redux-form';

export const config = ( initialState = {} ) => {

  //mirror of state from original app
  const reducer = combineReducers({
    comments: commentsReducer,
    login: loginReducer,
    users: userReducer,
    form: formReducer
    // courses: courseReducer,
    // authors: authorReducer,
    // ajaxCallsInProgress: ajaxStatusReducer
  });

  // return Createstore function here,
  // this will get fired as soon as config runs
  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

};