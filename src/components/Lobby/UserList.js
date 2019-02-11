import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import userIconDarkImg from "@img/rooms/baseline_person_black_18dp.png";
import uuid from "uuid/v1";
class UserList extends Component {


    renderUser= (users) => {
        return <Fragment>
            {users.map(user => (
                <li
                    key={user.id}>
                    {user.name}
                </li>
            ) )}
        </Fragment>
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
    maxPerson: PropTypes.number.isRequired
};

export default UserList;
