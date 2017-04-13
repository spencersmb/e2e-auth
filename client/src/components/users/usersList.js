import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../../actions/usersActions';

export class UsersList extends React.Component {

    constructor(props, context){
        super(props, context);
    }

    componentWillMount(){
        // Call users when component mounts
        // using custom ASYNC middleware

        //Check if we have already called it an its in state
        if(this.props.users && this.props.users.length > 0){
            return;
        }
        else{
            this.props.actions.fetchUsers();
        }
        
    }

    renderUsers(user){
        return (
            <div key={user.id} className="card card-block">

                <div className="card-inner">
                    <h4 className="card-title">
                        {user.name}
                    </h4>
                    <p className="card-text">{user.company.name}</p>
                    <a className="btn btn-primary" target="_blank" href={user.website}>Website</a>
                </div>
                
            </div>
        );
    }

    render(){
        let {users} = this.props;
        return (
            <div>
                <div className="users-list">
                    {users.map(this.renderUsers)}
                </div>
            </div>
        );
    }
}

UsersList.propTypes = {
  actions: PropTypes.object,
  users: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators( usersActions ,dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);