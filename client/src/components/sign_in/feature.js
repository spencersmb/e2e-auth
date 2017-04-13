import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/formSubmitActions';

class FeaturePage extends React.Component {

  componentWillMount(){
    this.props.fetchMessage();
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Feature Page</h1>
        <p>This page is only viewable when users are logged in.</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessage: bindActionCreators(actions.fetchMessage, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(FeaturePage);
