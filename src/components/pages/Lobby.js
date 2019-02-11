import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderText from "../App/Headers/HeaderText";
import UserList from "../Lobby/UserList";

class Lobby extends Component {

    leaveRoom = (userId) => {
        //TODO: Remove user from room, update data and redirect to home
        this.props.history.push("/");
    };

    render() {
        const room = this.props.location.data;
        const func = this.props.location;
        return (
            <div>
                <Fragment>
                    <HeaderText/>
                    <article className={"mainsec"}>
                        {/*<UserList users={room.users} maxPerson={room.maxPerson}/>*/}
                        <div className={"room-title-flexible"}>
                            Im Raum -
                            {/*<span style={{color:"#219653", fontWeight: "bold"}}> {func.reduceRoomName(room.name)} </span>*/}
                        </div>
                        <div className={"lobby-room"}>
                            <button
                                type="button"
                                onClick={this.leaveRoom}
                                className="btn btn-secondary btn-lg room-form_btn_cancel">
                                Raum verlassen
                            </button>
                        </div>
                    </article>
                </Fragment>
            </div>
        );
    }
}

Lobby.propTypes = {};

export default withRouter(Lobby);
