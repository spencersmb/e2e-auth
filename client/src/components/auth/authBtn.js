import React, {Component, PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';

export class AuthBtn extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleLogin = this.handleLogin.bind(this);
    this.isAuthorizedBtn = this.isAuthorizedBtn.bind(this);
  }

  handleLogin(){
    this.props.actions.toggleLogin();
  }

  isAuthorizedBtn(){
    if(this.props.isAuthorized){
      return(
        <Link to="/signout" activeClassName="active">Sign Out</Link>
      );
    }else{
      return(
        <Link to="/signin" activeClassName="active">Sign In</Link>
      );
    }
  }

  render() {
    return (
      // <button onClick={this.handleLogin}>{(this.props.login)? 'Sign Out' : 'Sign In'}</button>
      this.isAuthorizedBtn()
    );
  }
}

AuthBtn.propTypes = {
  login: PropTypes.bool,
  actions: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool
};

// pass on which props we want on this component
// ownProps are props already on the component we want to use
const mapStateToProps = (state, ownProps) => {
    return {
        login: state.login,
        isAuthorized: state.auth.isAuthorized
    };
};


// this param is optional
// determins what actions are available to us in this component
const mapDispatchToProps = (dispatch) => {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    actions: bindActionCreators( loginActions,dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthBtn);