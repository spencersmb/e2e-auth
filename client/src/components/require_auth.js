import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

/*
ComposedComponent - is the component that we want to wrap with
our HOC.
*/
export default function (ComposedComponent){

    class Authentication extends Component{
        

        // Fires right before component is about to render
        componentWillMount(){
            if(!this.props.isAuthorized){
                this.context.router.push('/');
            }
        }

        // When you signout - if your on a protected route - redirect
        componentWillUpdate(nextProps){
            if(!nextProps.isAuthorized){
                this.context.router.push('/signin');
            }
        }

        render(){
            // Pass props downto the wrapped component
            return(
                <ComposedComponent {...this.props}/>
            );
        }
    }

    //Declare what context you want access to within context
    Authentication.contextTypes = {
        router: PropTypes.object
    };

       Authentication.propTypes = {
        login: PropTypes.bool,
        isAuthorized: PropTypes.bool
    };

    function mapStateToProps(state){
        return {
            login: state.login,
            isAuthorized: state.auth.isAuthorized
        };
    }

    return connect(mapStateToProps)(Authentication);
}