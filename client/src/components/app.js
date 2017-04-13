// This component handles the APP template used on every page.
import React, {PropTypes} from 'react';
import CommentBox from './comment_box/commentBox';
import CommentList from './comment_box/commentList';
import Header from './header';

//getLoading status and pass it down
import {connect} from 'react-redux';

//export app to get accessed from webpack config alias
export class App extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (
      <div className="container-fluid">
        <Header isAuthorized={this.props.isAuthorized}/>
        <h1>React Simple Starter</h1>
        {this.props.children}
        <CommentBox />
        <CommentList />
      </div>
    );

  }
}

// React router will be passing child components as properties to the app component
// They will be composed on the page under the header
// added children as a required prop type on this component
App.propTypes = {
  children: PropTypes.object,
  isAuthorized: PropTypes.bool
};

function mapStateToProps( state, ownProps ) {
  return {
    loading: state.ajaxCallsInProgress > 0,
    isAuthorized: state.auth.isAuthorized
  };
}

export default connect(mapStateToProps)(App);