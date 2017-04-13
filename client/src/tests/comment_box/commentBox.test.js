import React, {PropTypes} from 'react';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import {CommentBox} from '../../components/comment_box/commentBox.js';

//Create an instance of our module
const setup = () => {

  let props = {
    actions: {
        saveComment: () => {
            
        }
    }
  };


  //renders out the module in memory DOM
  //Used Mount here to render child component of mount and have access to state from redux
  //if we dont need state you can use shallow if the class is not exported from redux originally
  return mount(<CommentBox {...props} />);
};

describe('CommentBox', () => {

    let wrapper;

    beforeEach( ()=>{
        wrapper = setup();
    } );

    it('Has the correct css class', () => {

        // check that the first element has the correct class
        expect(wrapper.find('form').hasClass('comment-box')).toBe(true);
    
    });
    
    it('Has a text area', () => {

        //check that the html has the correct html
        expect(wrapper.find('textarea').length).toBe(1);

    });

    it('Has a button', () => {

        //check that the html has the correct html
        expect(wrapper.find('button').length).toBe(1);

    });

    describe('Entering text interaction', ()=>{
       
        let textarea = '';

        beforeEach( ()=>{

            textarea = wrapper.find('textarea');
            wrapper.setState({comment: 'spencer'});

        } );

        it('Shows text that was entered', ()=>{
            
            expect(wrapper.find('textarea').props().value).toEqual('spencer');
            
        });

        it('When submitted clears the input', ()=>{

            wrapper.find('form').simulate('submit');
            expect(textarea.props().value).toEqual('');

        });
            

    });


});
