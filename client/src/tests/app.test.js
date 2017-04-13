import React from 'react';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import App from '../components/app.js';
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { commentsReducer } from '../reducers/commentsReducer';
import { loginReducer } from '../reducers/loginReducer';
import { userReducer } from '../reducers/usersReducer';
import { authReducer } from '../reducers/authReducer';
import { reducer as formReducer } from 'redux-form';

const setup = (saving = false) => {

  let props = {
    
  };

  const reducer = combineReducers({
    comments: commentsReducer,
    login: loginReducer,
    users: userReducer,
    form: formReducer,
    auth: authReducer
  });

  let store = createStore(
    reducer
    );

  //renders out the module in memory DOM
  //Used Mount here to render child component of mount and have access to state from redux
  //if we dont need state you can use shallow if the class is not exported from redux originally
  return mount(
      <Provider store={store} >
        <App/>
      </Provider>
    );
};

//group together similar tests
describe('App', () => {

    let wrapper = '';

    beforeEach( ()=>{

       wrapper = setup();
    
    } );

    // Make sure our comment box is showing up in the app
    it('Shows a comment box component', () => {
        
        expect(wrapper.find('.comment-box').length).toBe(1);
        
    });
    

    // Make sure our comment box is showing up in the app
    it('Shows a comment list component', () => {
        
        expect(wrapper.find('.comment-list').length).toBe(1);
        
    });

});

