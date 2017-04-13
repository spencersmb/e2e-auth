import React, {Component, PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';
import AuthBtn from './auth/authBtn';

class Header extends Component {

    constructor(props, context){
        super(props, context);
        this.isSignedIn = this.isSignedIn.bind(this); 
        this.showSignUp = this.showSignUp.bind(this); 
    }

    showSignUp(){
        if(!this.props.isAuthorized){
            return(
                <li className="nav-item">
                    <Link to="/signup" activeClassName="active">Sign Up</Link>
                </li>
            );
        }
    }

    isSignedIn(){
        if(this.props.isAuthorized){
            return(
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <IndexLink to="/" activeClassName="active">Home</IndexLink>
                    </li>
                    <li className="nav-item">
                        <Link to="/users" activeClassName="active">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/resources" activeClassName="active">Resources</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/feature" activeClassName="active">Feature</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signout" activeClassName="active">Sign Out</Link>
                    </li>
                </ul>
            );
        }else{
            return(
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <IndexLink to="/" activeClassName="active">Home</IndexLink>
                    </li>
                    <li className="nav-item">
                        <Link to="/users" activeClassName="active">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signin" activeClassName="active">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" activeClassName="active">Sign Up</Link>
                    </li>
                </ul>
                
            );
        }
    }

    render(){
        const {isAuthorized} = this.props;
        return(
            <nav className="navbar navbar-light">
                {this.isSignedIn()}
            </nav>
        );
    }
}

Header.propTypes = {
    isAuthorized: PropTypes.bool
};

export default Header;