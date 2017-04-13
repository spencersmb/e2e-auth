import React, { Component, PropTypes } from 'react';
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import renderField from './renderField';
import * as actions from '../../actions/formSubmitActions';

export class SignUp extends Component {
    
    constructor(props, context){
        super(props, context);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(formProps){

        //call action creator to sign up the user on the server
        this.props.actions.signupUser(formProps);

    }

    render(){
        const { handleSubmit, valid, errorMessage } = this.props;
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
            <div>
                Sign Up page
                <form className="auth-form" onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <fieldset className="form-group">
                        <Field name="email" type="email" component={renderField} label="Email:"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <Field name="password" type="password" component={renderField} label="Password:"/>
                        {/*{password.error}*/}
                    </fieldset>
                    <fieldset className="form-group">
                        <Field name="passwordConfirm" type="password" component={renderField} label="Confirm Password:"/>
                    </fieldset>
                    {loginErrorText()}
                    <button action="submit" className="btn btn-primary" disabled={valid === false ? 'disabled' : ''} >Sign Up</button>
                </form>
            </div>
        );
    }
}

SignUp.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    actions: PropTypes.object,
    errorMessage: PropTypes.string
};

function validate(formProps){
    let errors = {};

    const requiredFields = [ 'email', 'password', 'passwordConfirm' ];

    requiredFields.forEach(field => {
        if (!formProps[ field ]) {
            errors[ field ] = 'Required'
        }
    })

    if (!formProps.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
        errors.email = 'Invalid email address'
    }

    if(formProps.password != formProps.passwordConfirm){
        errors.passwordConfirm = 'Passwords Must Match';
    }

    return errors;
}



const SignUpForm = reduxForm(
    {  
        form: 'signin',
        validate
    }
    )(SignUp);

const mapDispatchToProps = (dispatch) => {
    return{
        actions: bindActionCreators(actions, dispatch)
    };
};

const mapStateToProps = (state, ownProps) => {

    return {
        errorMessage: state.auth.error
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

