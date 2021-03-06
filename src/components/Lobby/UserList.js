import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import userIconDarkImg from "@img/rooms/baseline_person_black_18dp.png";
class UserList extends Component {


    renderUser= (users) => {
        return <Fragment>
            {users.map(user => (
                <li
                    key={user._id}>
                    {user.name}
                    <div className={"userlist_current-user"}>
                        {this.setCurrentUser(user._id, this.props.currUser)}
                    </div>
                    <div className={"userlist_admin"}>
                        {this.setAdmin(user)}
                    </div>
                </li>
            ) )}
        </Fragment>
    };

    setCurrentUser = (userId, currUserId) => {
        return (userId === currUserId) ? "Ich" : "";
    };

    setAdmin = (user) => {
        return (user.adminStatus === true) ? "Admin" : "";
    };


    userinfo = () => {
      return (""+this.props.users.length.toString()+"/"+this.props.maxPerson.toString());
    };

    render() {
        return (
            <div className="userlist">
                <h3 className="side-title">
                    <span className="side-title_name">Im Raum</span>
                    <span className="side-title_info">
                        <img className={"userinfo-icon"} src={userIconDarkImg}/>
                        {this.userinfo()}
                    </span>
                </h3>
                <ul className="list-unstyled">
                    {this.renderUser(this.props.users)}
                </ul>
            </div>
        );
    }
}

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    maxPerson: PropTypes.number.isRequired,
    currUser: PropTypes.string
};

export default UserList;
