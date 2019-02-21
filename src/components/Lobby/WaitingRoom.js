import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import UserList from "./UserList";
import Header from "../App/Headers/Header";

class WaitingRoom extends Component {


    createInviteLink = () => {

    };

    renderPassword = (password) => {
        if(password ){
            return (<span><b>Passwort:</b> {password}</span>)
        }
    };

    renderMainTopic = (topic) => {
        if(topic){
            return (<div><b>Thema:</b> {topic}</div>);
        }else {
            return (
                <div><b>Thema:</b>
                    <span className={"lobby-room_text-unavailable"}> Nicht angegeben</span>
                </div>);
        }
    };

    renderStartMainTopicButton = (room, currUserId) => {
        let currUser;
        room.users.forEach( user => {
            (user._id === currUserId) ? currUser=user : {};
        });

        if(currUser.adminStatus){
            if(room.users.length > 1){
                return (
                    <div>
                        <button
                            type="button"
                            onClick={this.props.startMainTopicRoom}
                            className="btn btn-success lobby_start-btn btn-lg btn-block">
                            Starten
                        </button>
                    </div>

                );
            }else {
                return (
                    <div>
                        <button
                            type="button"
                            disabled={true}
                            className="btn btn-secondary lobby_start-btn btn-lg btn-block">
                            Warten auf neue User ...
                        </button>
                    </div>
                );
            }
        }else return null;

    };

    render() {
        const room = this.props.room;
        return (
                <Fragment>
                        <div className={"lobby-room"}>
                            {this.renderMainTopic(room.mainTopic)}
                            {this.renderPassword(room.password)}
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-info lobby_invite-btn"
                                    onClick={this.createInviteLink}
                                >
                                   + User einladen
                                </button>
                            </div>
                            {this.renderStartMainTopicButton(room, this.props.userId)}
                        </div>
                </Fragment>
        );
    }
}

WaitingRoom.propTypes = {
    reduceRoomName: PropTypes.func,
    room: PropTypes.object,
    startMainTopicRoom: PropTypes.func,
    userId: PropTypes.string,
    leaveRoom: PropTypes.func
};

export default WaitingRoom;
