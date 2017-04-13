import * as types from '../actions/actionTypes';
import initialState from './initialState';

export const userReducer = ( state = initialState.users, action ) => {

    switch(action.type){

        case types.FETCH_USERS:
            // console.log(action);
            // in addition to whats in state
            // add in our data from the action
            return [
                ...state,
                ...action.data.data // pull the data off the return value from the server
            ];

        default:
            return state;
    }
};