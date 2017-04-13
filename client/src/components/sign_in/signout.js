import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FormSubmitActions from '../../actions/formSubmitActions';

export class SignoutPage extends React.Component {

    constructor(props, context){
        super(props, context);
    }

    componentWillMount(){
        this.props.actions.signoutUser();
    }

    render(){
        return(
            <div>
                You've logged out successfully! Come back soon!
            </div>
        );
    }
}

SignoutPage.propTypes = {
    actions: PropTypes.object
};

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators(FormSubmitActions, dispatch)
    };

};

export default connect(null, mapDispatchToProps)(SignoutPage);