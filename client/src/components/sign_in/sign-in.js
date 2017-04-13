import React, { Component, PropTypes } from 'react';
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/formSubmitActions';

export class SignIn extends Component {

    constructor(props, context){
        super(props, context);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit({email, password}){

        //sent from redux-form
        this.props.actions.signinUser({email, password});

    }

    

    render(){

        // handleSubmit is a function given to us from Redux-form
        const { handleSubmit, errorMessage } = this.props;
        const loginErrorText = () => {
            if(errorMessage.length > 0){
                return(
                    <div className="bs-callout bs-callout-danger">
                        <h4>
                            {errorMessage}
                        </h4>
                    </div>
                );
            }
            
        };

        return(
            <form className="auth-form" onSubmit={handleSubmit(this.handleFormSubmit)}>
                
                <fieldset className="form-group">
                    <label >Email:</label>
                    <Field className="form-control" name="email" component="input" type="email"/>
                </fieldset>
                <fieldset className="form-group">
                    <label >Password:</label>
                    <Field className="form-control" name="password" component="input" type="password"/>
                </fieldset>
                {loginErrorText()}
                <button action="submit" className="btn btn-primary">Sign In</button>
            </form>
        );
    }
        
}

SignIn.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    actions: PropTypes.object,
    errorMessage: PropTypes.string
};


//CORRECT WAY TO USE REDUX + REDUX-FORM v6 and above 
const signInForm = reduxForm({  form: 'signin' })(SignIn);

const mapStateToProps = (state, ownProps) => {
    return {
        errorMessage: state.auth.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators( actions ,dispatch)
    };
};
 
export default connect( mapStateToProps, mapDispatchToProps)(signInForm);
