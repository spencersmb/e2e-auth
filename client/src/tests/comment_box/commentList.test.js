import React, {PropTypes} from 'react';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import {CommentList} from '../../components/comment_box/commentList.js';

//Create an instance of our module
const setup = () => {

  let props = {
    comments: [
        'Comment 1',
        'Comment 2'
    ]
  };


  //renders out the module in memory DOM
  //Used Mount here to render child component of mount and have access to state from redux
  //if we dont need state you can use shallow if the class is not exported from redux originally
  return mount(<CommentList {...props} />);
};

describe('CommentList', () => {

    let wrapper = '';

    beforeEach( () => {
        wrapper = setup();
    });


    it('Shows an LI item for each comment', () => {

        //Count number of LIs to create test
        expect(wrapper.find('li').length).toBe(2);

    });

    it('Shows each comment provided', () => {

        expect(wrapper.find('li').first().text()).toBe('Comment 1');
        // expect(wrapper.contains('Comment 2')).toBe(true);
    });

});