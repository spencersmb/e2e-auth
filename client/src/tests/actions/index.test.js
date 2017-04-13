import React, {PropTypes} from 'react';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';

import {SAVE_COMMENT} from '../../actions/actionTypes.js';
import {saveComment} from '../../actions/commentsActions';
import {commentsReducer} from '../../reducers/commentsReducer';


describe('Comments Actions', () => {

    describe('Save Comment', () => {

        const newComment = 'new Comment';

        //Setup action that gets called
        const action = saveComment(newComment);

        it('has the correct type', () => {
            
            //assertion - createCourseSuccess reducer - returns all the courses + the new course added in a new array
            expect(action.type).toEqual(SAVE_COMMENT);

        });

        it('has the correct data', () => {
            expect(action.comment).toEqual(newComment);
        });

    });

});