import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'App';
import HomePage from 'Home';
import ResourcesPage from './components/resources/resourcesPage';
import UsersPage from './components/users/usersPage';
import SignIn from './components/sign_in/sign-in';
import SignUp from './components/sign_in/signup';
import SignoutPage from './components/sign_in/signout';
import FeaturePage from './components/sign_in/feature';

//HOC component
import Auth from './components/require_auth';


// each item is passed in as a child by react routing to App.
export default (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage}/>
    <Route path="users" component={UsersPage}/>
    <Route path="resources" component={Auth(ResourcesPage)}/>
    <Route path="signin" component={SignIn}/>
    <Route path="signout" component={SignoutPage}/>
    <Route path="signup" component={SignUp}/>
    <Route path="feature" component={Auth(FeaturePage)}/>
  </Route>
);
