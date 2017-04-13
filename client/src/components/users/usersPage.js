import React from 'react';
import UsersList from './usersList';

class UsersPage extends React.Component {
    render() {
        return (
            <div>
                <div className="user-page jumbotron">
                    <h1>Users List</h1>
                </div>
                <UsersList />
            </div>
        );
    }
}

export default UsersPage;