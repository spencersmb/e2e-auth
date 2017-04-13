import initialState from './initialState';
import * as ReduxActionType from '../actions/actionTypes';

export const authReducer = (state = initialState.auth, action) => {
    
    switch (action.type){


        case ReduxActionType.AUTH_USER:

            return {
                ...state,
                isAuthorized:true
            };

        case ReduxActionType.UNAUTH_USER:

            return {
                ...state,
                isAuthorized:false
            };

        case ReduxActionType.AUTH_ERROR:

            return {
                ...state,
                error:action.error
            };

        default:
            return state;
    }

};