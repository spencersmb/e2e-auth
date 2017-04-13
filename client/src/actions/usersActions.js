import axios from 'axios';
import * as types from '../actions/actionTypes';

export const fetchUsers = () => {
    //gives us data in the form of a promise
    const request = axios.get('https://jsonplaceholder.typicode.com/users');

    // the data: type is monitored for promises using our middleware
    // will probly need to change that
    return {
        type: types.FETCH_USERS,
        data: request // data wrapped in Promise sent to reducer
    };
};