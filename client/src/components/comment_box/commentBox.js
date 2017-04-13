import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentActions from '../../actions/commentsActions';

export class CommentBox extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      comment: ''
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(event){
    this.setState({
      comment: event.target.value
    });
  }

  handleSubmit(event){

    event.preventDefault();

    this.props.actions.saveComment(this.state.comment);

    this.setState({
      comment: ''
    });

  }

  render() {
       let {comment} = this.state;
    
    return (
      <form className="comment-box" onSubmit={this.handleSubmit}>
        <h1>CommentBox</h1>
        <textarea name="" id="" cols="30" rows="10" value={comment} onChange={this.handleTextChange}></textarea>
        <button type="submit">Submit Comment</button>
      </form>
    );
  }
}

CommentBox.propTypes = {
  actions: PropTypes.object
  // courses: PropTypes.array
};

// pass on which props we want on this component
// ownProps are props already on the component we want to use
// const mapStateToProps = (state, ownProps) => {
//   return {
//     courses: state.courses
//   };
// };

// this param is optional
// determins what actions are available to us in this component
const mapDispatchToProps = (dispatch) => {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    actions: bindActionCreators(commentActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(CommentBox);