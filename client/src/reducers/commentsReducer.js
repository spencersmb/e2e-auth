import * as types from '../actions/actionTypes';
import initialState from './initialState';

export const commentsReducer = (state = initialState.comments, action) => {

  switch(action.type){
      

      case types.SAVE_COMMENT:
      
        //return original state + our new comment
        return [
            ...state,
            action.comment
        ];
      
      default:
        return state;

  }

};