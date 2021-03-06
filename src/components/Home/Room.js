import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

//Icons
import lockImg from "@img/rooms/baseline_lock_white_18dp.png";
import usersImg from "@img/rooms/baseline_person_white_18dp.png";
import JoinRoom from "../pages/JoinRoom";

class Room extends Component {

    renderLock= (hasPassword) => {
        return (hasPassword) ? <img className={"room-icon"} src={lockImg}/> : null;
    };

    joinRoom = (id) => {
        this.props.history.push({
            pathname: "/joinroom",
            search: id,
            roomid: id
        });
    };

    roomCurrPerson = (users) => {
        return users.length;
    };

    render() {
        const data = this.props.data;
        return (
            <div onClick={() => this.joinRoom(data._id)} className={"room-block"}>
                <div className={"room-block-data"}>
                    <div className={"room-block_name"}>
                        {data.name}
                    </div>
                    <div className={"room-block_down"}>
                        <span className={"room-block_users"}>
                            <img className={"room-icon"} src={usersImg}/>
                            <span className={"room-block_usercount"}>
                                {data.users.length}/{data.maxPerson}
                            </span>
                        </span>
                        <span className={"room-block_lock"}>
                            {this.renderLock(data.password)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

Room.propTypes = {
    data: PropTypes.object
};

export default withRouter(Room);

