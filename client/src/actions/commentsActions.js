import {SAVE_COMMENT} from './actionTypes';

export const saveComment = comment => {
    return{
        type:SAVE_COMMENT,
        comment
    };
};