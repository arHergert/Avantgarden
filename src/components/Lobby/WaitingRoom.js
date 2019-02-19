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

    renderStartMainTopicButton = (hasStarted) => {
        if(hasStarted){
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
    };

    render() {
        const room = this.props.room;
        return (
            <div>
                <Fragment>
                    <Header/>
                    <article className={"mainsec"}>
                        <div className={"lobby_userlist"}>
                            <UserList currUser={this.props.userId} users={room.users} maxPerson={room.maxPerson}/>
                            <button
                                type="button"
                                onClick={this.leaveRoom}
                                className="btn btn-danger lobby_leave-btn">
                                Raum verlassen
                            </button>
                        </div>
                        <div className={"room-title-flexible"}>
                            <span style={{color:"#219653", fontWeight: "bold"}}> {this.props.reduceRoomName(room.name)} </span>
                        </div>
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
                            {this.renderStartMainTopicButton(false)}
                        </div>

                    </article>
                </Fragment>
            </div>
        );
    }
}

WaitingRoom.propTypes = {
    reduceRoomName: PropTypes.func,
    room: PropTypes.object,
    startMainTopicRoom: PropTypes.func,
    userId: PropTypes.string
};

export default WaitingRoom;
