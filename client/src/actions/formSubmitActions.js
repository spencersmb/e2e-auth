import {browserHistory} from 'react-router';
import axios from 'axios';
import * as ReduxActionType from '../actions/actionTypes';

const API_URL = 'http://localhost:3090';

export const signinUser = ({email, password}) => {

    //because we are using THunk - we are returning a function here instead of just an object
    return (dispatch) => {

        //we can now make any type of asyn action using
        // dispatch({type:..., data: ...});

        //STEP 1
        //Submit email & password to server
        //es6 syntax for the object we are passing in - email:email etc.
        axios.post(`${API_URL}/signin`, { email, password })

            // If request is good...
            .then(r => {

                // update state to indicate user is authenticated
                // Dispatch action with type to send to the reducer
                // Optionally if we were getting data from the server this is where we would send it to our reducer
                dispatch({type: ReduxActionType.AUTH_USER});


                //Save JWT token
                localStorage.setItem('token', r.data.token);

                //Redirect to the routes feature using react router
                browserHistory.push('/feature');


            })
            //If request is bad...
            .catch(err => {

                //Show an error to user by calling another action creater from this action creator
                dispatch(authError('Incorrect Login info'));

            });

    };
   
};

export const signupUser = ({email, password}) => {

    return (dispatch) => {

        //STEP 1
        //Submit email & password to server
        //es6 syntax for the object we are passing in - email:email etc.
        axios.post(`${API_URL}/signup`, { email, password })
        // If request is good...
            .then(r => {

                // update state to indicate user is authenticated
                // Dispatch action with type to send to the reducer
                // Optionally if we were getting data from the server this is where we would send it to our reducer
                dispatch({type: ReduxActionType.AUTH_USER});


                //Save JWT token
                localStorage.setItem('token', r.data.token);

                //Redirect to the routes feature using react router
                browserHistory.push('/feature');


            })
            //If request is bad...
            .catch(err => {

                //Show an error to user by calling another action creater from this action creator
                dispatch(authError('Email is in use'));

            });

    };
};

export const authError = error => {
    return {
        type: ReduxActionType.AUTH_ERROR,
        error
    };
};

export const signoutUser = error => {

    localStorage.removeItem('token');

    return {
        type: ReduxActionType.UNAUTH_USER
    };
};

export const checkUserAuth = () => {
  
  const token = localStorage.getItem('token');

  return (dispatch) => {

        // pass in headers to the server
        axios.get(`${API_URL}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then( r => {

            //console.log('user authorized on the server');
            dispatch({type: ReduxActionType.AUTH_USER});

        })
        .catch(err => {
            
            // console.log('token found, but not authorized - removed token');
            localStorage.removeItem('token');
            dispatch({type: ReduxActionType.UNAUTH_USER});

        });
    }

};

//actions
export const fetchMessage = () => {
    return (dispatch) => {
      
    }
}