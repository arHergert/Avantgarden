import React, {Component} from 'react';
import PropTypes from "prop-types";

//Icons
import lockImg from "@img/rooms/baseline_lock_white_18dp.png";
import usersImg from "@img/rooms/baseline_person_white_18dp.png";

class Room extends Component {



    renderLock= (hasPassword) => {
        return (hasPassword) ? <img className={"room-icon"} src={lockImg}/> : null;
    };

    render() {
        const data = this.props.data;
        console.log();
        return (
            <div onClick={() => this.props.joinRoom(data.name)} className={"room-block"}>
                <div className={"room-block-data"}>
                    <div className={"room-block_name"}>
                        {data.name}
                    </div>
                    <div className={"room-block_down"}>
                        <span className={"room-block_users"}>
                            <img className={"room-icon"} src={usersImg}/>
                            <span className={"room-block_usercount"}>
                                {data.currPerson}/{data.maxPerson}
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

export default Room;

