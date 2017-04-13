import React, {PropTypes} from 'react';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import * as reducer from '../../reducers/commentsReducer';
import * as actions from '../../actions/commentsActions';


describe('Comments Reducer', () => {

    const initialState = {
        comments:[]
    };

    const action = actions.saveComment('New Comment');

    const newState = reducer.commentsReducer(initialState, action);

    const noType = reducer.commentsReducer(initialState, {type:'', comment:'no type comment'});

    it('Handles action with no type', () => {

        expect(noType).toEqual(initialState);
        
    });

    it('Should add comment when Passed Save Comment Action', () => {

        expect(newState).toBeAn(Array);
        expect(newState).toEqual(['New Comment']);

    });

});