import * as types from '../actions/actionTypes';
import initialState from './initialState';

export const loginReducer = (state = initialState.login, action) => {
    let login;
    switch(action.type){

        case types.TOGGLE_LOGIN:
            return !state;

        default:
            return state;

    }
};