import React, {PropTypes} from 'react';
import { connect } from 'react-redux';


export const CommentList = (props) => {
    let list = '';
    if(props.comments && props.comments.length > 0){
        list = props.comments.map( comment => <li key={comment}>{comment}</li>);
    }
    
    return(
        <ul className="comment-list">
            {list}
        </ul>
    );
};

CommentList.propTypes = {
  comments: PropTypes.array
//   deleteCourse: PropTypes.func
};

function mapStateToProps(state){
    
    return {
        comments: state.comments
    };

}

// Turn component into a redux container
export default connect(mapStateToProps)(CommentList);
